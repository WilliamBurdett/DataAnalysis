<?php
include dirname('C:/wamp/www/ALAnew/Include/connectToDatabase.php') . '/connectToDatabase.php';
mysql_select_db("visual_backend");
mysql_query("insert into skip_list (value, table_id) values ('" . $_REQUEST['value'] . "','" . $_REQUEST['table_id'] . "')");
mysql_query("update table_list set fullRefresh='Yes' where table_id=" . $_REQUEST['table_id']);
echo "resetLists();";
?>