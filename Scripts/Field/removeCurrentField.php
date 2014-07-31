<?php
include dirname('C:/wamp/www/ALAnew/Include/connectToDatabase.php') . '/connectToDatabase.php';
mysql_select_db("visual_backend");
$tableResult = mysql_fetch_array(mysql_query("select * from table_list where table_id=". $_REQUEST['table_id']));
mysql_query("delete from table_list where table_id = " . $_REQUEST['table_id']);
mysql_query("delete from skip_list where table_id = " . $_REQUEST['table_id']);
mysql_query("delete from consolidate_list where table_id = " . $_REQUEST['table_id']);
echo "markUnused('" . $tableResult['tableName'] . "','" . $tableResult['fieldName'] . "');\nchooseTableName();";
?>