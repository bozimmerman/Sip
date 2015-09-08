del com\planet_ink\sip\*.class
javac com/planet_ink/sip/*.java
del *.jar
jar -cmvf manifest Sip.jar com
xcopy /e /c /r /y *.* i:\projects\sip\.
xcopy /e /c /r /y  Sip.jar i:\windows\desktop\.
xcopy /e /c /r /y  Sip.jar i:\www.zimmers.net\home\mud\.
xcopy /e /c /r /y  Sip.jar c:\windows\desktop\.
