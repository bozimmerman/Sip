package com.planet_ink.sip;

import javax.swing.JTextPane;
import javax.swing.text.BadLocationException;
import javax.swing.text.Document;
//import javax.swing.text.html.*;

public class MUDPain extends JTextPane
{
	/**
	 * 
	 */
	private static final long serialVersionUID = -7120722857208552965L;

	//private HTMLEditorKit htmlEdKit = new HTMLEditorKit();
	
	public MUDPain() 
	{
		super();
		//this.setEditorKit(htmlEdKit);
	}
	
	public void append(String str) 
	{
		Document doc = getDocument();
		if (doc != null) 
		{
			try 
			{
				doc.insertString(doc.getLength(), str, null);
			} 
			catch (BadLocationException e) 
			{
			}
		}
	}
}
