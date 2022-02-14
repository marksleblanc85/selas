<?php

/* ==============================================
Settings
============================================== */

define("MAILTO" , "email@website.com");
define("SUBJECT" , "Attraction Web Form");

define("ERROR_MESSAGE" , "Error sending your message");
define("SUCCESS_MESSAGE" , "Message Sent");

/* ==============================================
Email Sender
============================================== */

/* create email message */
$message = '';
    
// Name 
$message .= 'Name : ' . $_POST['name'] . "\r\n";

// Email
$message .= 'Email : ' . $_POST['email'] . "\r\n";

// Message
$message .= 'Message : ' . $_POST['message'] . "\r\n";

function validateEmail($email) {
   if(preg_match("/^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,6}$/i", $email))
	  return true;
   else
	  return false;
}

if((strlen($_POST['name']) < 1 ) || (strlen($_POST['email']) < 1 ) || validateEmail($_POST['email']) == FALSE ) {

	echo( ERROR_MESSAGE );

} else {

	if( mail( MAILTO , SUBJECT , $message , "From: ".$_POST['name']." <".$_POST['email'].">\r\n" ."Reply-To: ".$_POST['email']."\r\n" ) ) {
		
		echo( SUCCESS_MESSAGE );

	} else {

		echo( ERROR_MESSAGE );

	}

}

?>