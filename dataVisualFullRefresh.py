import _mysql
from datetime import datetime, timedelta
 
yesterday = datetime.now()
dateToUse = yesterday.strftime('%Y-%m-%d')
 
db = _mysql.connect(db="visual",user="root",passwd="happy")

tableSQl = """select tableName, fieldName, fromSQL, functionName, functionSQL from tableList"""
tableSQL += """join functionList on functionList.functionName = tableList.functionName"""
db.query(tableSQL)
table = db.use_result()[0]

#Used to find values to be consolidated
consolidationSQL = """select value from consolidationList where fieldName='""" + table[1] + """'""")
db.query(consolidationSQL)
consolidationList = db.store_result()[0]
consolidationSQL = """ """
for value in consolidationList:
	consolidationSQL += """ AND """ + table[1] + """ NOT REGEXP '^""" + value """' """

#used to find values to be skipped
skipSQL = """select value from skipList where fieldName='""" + table[1] + """'""")
db.query(skipSQL)
skipList = db.store_result()[0]
skipSQL = """ """
for value in skipList:
	skipSQL += """ AND """ + table[1] + """<>'""" + value """' """

db.query("""delete from """ + table[0] + """ where dateSelected>='""" + dateToUse + """'""")

insertSQL = """insert into """ + table[0] + """ (""" + table[1] + """, """ +table[3] + """, dateSelected"""
insertSQL += """\nselect """ + fieldName + """, """ + table[4] + """, InvoiceDate from """ + table[2]
insertSQL += """\nwhere InvoiceDate>='""" + dateToUse + """' """ + consolidationSQL + skipSQL
insertSQL += """\ngroup by InvoiceDate, """ + table[1]
print insertSQL
+#db.query(invoiceSQL)

for value in consolidationList:
	insertSQL = """insert into """ + table[0] + """ (""" + table[1] + """, """ +table[3] + """, dateSelected"""
	insertSQL += """\nselect '""" + value + """ - All', """ + table[4] + """, InvoiceDate from """ + table[2]
	insertSQL += """\nwhere InvoiceDate>='""" + dateToUse + """' """ + table[1] """ REGEXP '^""" value """'"""
	insertSQL += """\ngroup by InvoiceDate"""
	print invoiceSQL
	#db.query(invoiceSQL)
deleteSQL = """delete from """ + table[0] + """ where dateSelected>'""" + dateToUse + """' or """ + table[1] + """ is null or """ + table[1] + """=''"""
#db.query(deleteSQL)