<?php
include dirname('C:/wamp/www/ALAnew/Include/connectToDatabase.php') . '/connectToDatabase.php';
mysql_select_db("visual_backend");
mysql_query("update formula_list set markForDeletion='Yes' where formula_id=" . $_REQUEST['formula_id']);
?>