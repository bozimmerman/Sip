/*
 * Connector.java
 *
 * Created on February 3, 2001, 10:44 PM
 */

package com.planet_ink.sip;

import java.io.*;
import java.net.*;
import java.nio.ByteBuffer;

/**
 *
 * @author  Bo_Zimmerman
 * @version 
 */
public class Connector extends Thread 
{
	public static final int SOTIMEOUT	= 300;

	public boolean 			connected	= false;
	public Socket 			sock		= null;
	public BufferedReader	in;
	public PrintWriter 		out;
	public Sip 				myApp		= null;
	public StringBuffer 	input		= new StringBuffer("");
	private ByteBuffer		ansiBuf		= ByteBuffer.allocate(4096);
	
	/** Creates new Connector */
	public Connector() 
	{
		
	}

	public void sendOut(String output)
	{
		if(output==null) return;
		out.print(output);
		out.flush();
	}
	
	public String connect(Sip A, String site, int port)
	{
		try
		{
			myApp=A;
			sock=new Socket(site,port);
			if(sock!=null)
			{
				sock.setSoTimeout(SOTIMEOUT);
				out=new PrintWriter(sock.getOutputStream());
				in=new BufferedReader(new InputStreamReader(sock.getInputStream()));
			}
			connected=true;
		}
		catch(Exception e)
		{
			connected=false;
			return e.getMessage();
		}
		return "";
	}
	
	public void disconnect()
	{
		connected=false;
		try
		{
			if(in!=null)
				in.close();
			if(out!=null)
				out.close();
			if(sock!=null)
				sock.close();
		}
		catch(Exception e)
		{
		}
		in=null;
		out=null;
		sock=null;
	}
	public void run() 
	{
		StringBuffer tout=new StringBuffer("");
		try
		{
			while(true)
			{
				try
				{
					char c=(char)in.read();
					if((c>0)&&(c!=13))
					{
						tout.append(c);
						if(c==65535)
						{
							disconnect();
							myApp.lilboy();
							return;
						}
						if((tout.length()>100)||(c==10))
						{
							myApp.writeOut(tout.toString());
							tout.setLength(0);
						}
					}
					
				}
				catch(java.io.InterruptedIOException e)
				{
					if(e.getMessage().toUpperCase().indexOf("CONNECTION RESET BY PEER")>=0)
					{
						disconnect();
						myApp.lilboy();
						return;
					}
					else
					if(tout.length()>0)
					{
						myApp.writeOut(tout.toString());
						tout.setLength(0);
					}
					
				}
				catch(Exception e)
				{
					if(e.getMessage().toUpperCase().indexOf("CONNECTION RESET BY PEER")>=0)
					{
						disconnect();
						myApp.lilboy();
						return;
					}
					break;
				}
			}
		}
		catch(Exception e)
		{
			if(e.getMessage().toUpperCase().indexOf("CONNECTION RESET BY PEER")>=0)
			{
				disconnect();
				myApp.lilboy();
				return;
			}
			e.printStackTrace();
		}
	}
}
