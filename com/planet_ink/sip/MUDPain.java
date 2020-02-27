package com.planet_ink.sip;

import javax.swing.JEditorPane;
import javax.swing.JTextPane;
import javax.swing.text.BadLocationException;
import javax.swing.text.Document;
import javax.swing.text.html.*;

public class MUDPain extends JEditorPane 
{
	/**
	 * 
	 */
	private static final long serialVersionUID = -7120722857208552965L;

	private HTMLEditorKit htmlEdKit = new HTMLEditorKit();
	
	public MUDPain() 
	{
		super();
		this.setEditorKit(htmlEdKit);
		this.setEditable(false);
		StyleSheet styleSheet = htmlEdKit.getStyleSheet();
        styleSheet.addRule("body {color:#000; font-family:monospace; margin: 4px; }");
        styleSheet.addRule("h1 {color: blue;}");
        styleSheet.addRule("h2 {color: #ff0000;}");
        styleSheet.addRule("pre {font : 10px monospace; color : black; background-color : #fafafa; }");
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
