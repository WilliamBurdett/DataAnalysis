import _mysql
from datetime import datetime, timedelta

class Field:
	def __init__(self, tableId, tableN, fieldN, refresh, fromS, skipList, consolidateList):
		self.table_id = tableId
		self.tableName = tableN
		self.fieldName = fieldN
		self.fullRefresh = refresh
		self.fromSQL = fromS
		self.skip_list = skipList
		self.consolidate_list = consolidateList

class Formula:
	def __init__(self, formulaN, formulaS, formulaId, newForm, marked, valueT):
		self.formulaName = formulaN
		self.formulaSQL = formulaS
		self.formula_id = formulaId
		self.newFormula = newForm
		self.markForDeletion = marked
		self.valueType = valueT



yesterday = datetime.now() - timedelta(days=1)
dateToUse = yesterday.strftime('%Y-%m-%d')

db = _mysql.connect(db="visual_backend",user="root",passwd="happy")
#0: table_id
#1: tableName
#2: fieldName
#3: fullRefresh
#4: fromSQL

fieldList = []
formulaList = []

fieldSQL = """select table_id,table_list.tableName,fieldName,fullRefresh,fromSQL from table_list join table_info on table_info.tableName=table_list.tableName"""
db.query(fieldSQL)
fieldQuery = db.store_result()
fieldListRaw = fieldQuery.fetch_row(maxrows=0)
for field in fieldListRaw:
	#skip_list
	skip_list = []
	skipSQL = """select value from skip_list where table_id=""" + field[0]
	db.query(skipSQL)
	skipQuery = db.store_result()
	skipListRaw = skipQuery.fetch_row(maxrows=0)
	for skip in skipListRaw:
		skip_list.append(skip[0])
	
	#consolidate_list
	consolidate_list = []
	conSQL = """select value from consolidate_list where table_id=""" + field[0]
	db.query(conSQL)
	conQuery = db.store_result()
	conListRaw = conQuery.fetch_row(maxrows=0)
	for con in conListRaw:
		consolidate_list.append(con[0])
	
	newField = Field(field[0], field[1], field[2], field[3], field[4], skip_list, consolidate_list)
	fieldList.append(newField)

formulaSQL = """select formulaName, formulaSQL, formula_id, newFormula, markForDeletion, valueType from formula_list"""
db.query(formulaSQL)
formulaQuery = db.store_result()
formulaListRaw = formulaQuery.fetch_row(maxrows=0)
for formula in formulaListRaw:
	newFormula = Formula(formula[0], formula[1], formula[2], formula[3], formula[4], formula[5])
	formulaList.append(newFormula)
	
for formula in formulaList:
	if formula.markForDeletion=="Yes":
		if formula.newFormula=="No":
			deleteSQL = """delete from formula_list where formula_id=""" + formula.formula_id
			print deleteSQL
			print " "
			db.query(deleteSQL)
			for field in fieldList:
				dropSQL = """drop table IF EXISTS """ + field.fieldName + field.tableName + formula.formulaName
				print dropSQL
				print " "
				db.query(dropSQL)
	else:
		if formula.newFormula=="Yes":
			unmarkSQL = """update formula_list set newFormula='No' where formula_id=""" + formula.formula_id
			print unmarkSQL
			print " "
			db.query(unmarkSQL)
			for field in fieldList:
				createSQL = """create table IF NOT EXISTS """ + field.fieldName + field.tableName + formula.formulaName + """ (formulaValue """ + formula.valueType + """, fieldValue VARCHAR(50), dateSelected DATE)"""
				print createSQL
				print " "
				db.query(createSQL)
				
		for field in fieldList:
			if field.fullRefresh=="Yes" or formula.newFormula=="Yes":
				truncateSQL = """truncate """ + field.fieldName + field.tableName + formula.formulaName
				print truncateSQL
				db.query(truncateSQL)
				invoiceSQL = """InvoiceDate>='2009-01-01' """
				unmarkSQL = """update table_list set fullRefresh='No' where table_id=""" + field.table_id
				print unmarkSQL
				print " "
				db.query(unmarkSQL)
			else:
				invoiceSQL = """InvoiceDate>='""" + dateToUse + """' """
			consolidateSQL=""""""
			skipSQL=""""""
			for value in field.consolidate_list:
				consolidateSQL+=""" and """ + field.tableName + """.""" + field.fieldName + """ NOT REGEXP '^""" + value + """' """
			for value in field.skip_list:
				skipSQL+=""" and """  + field.tableName + """.""" + field.fieldName + """<>'""" + value + """' """
			insertSQL = """insert into """ + field.fieldName + field.tableName + formula.formulaName + """ (formulaValue, fieldValue, dateSelected)"""
			insertSQL += """\nselect """ + formula.formulaSQL + """, """ + field.tableName + """.""" + field.fieldName + """, InvoiceDate """ + field.fromSQL
			insertSQL += """\nwhere """ + invoiceSQL + """ and """ + field.tableName + """.""" + field.fieldName + """<>'' """ + skipSQL + consolidateSQL
			insertSQL += """\ngroup by InvoiceDate, """ + field.tableName + """.""" + field.fieldName
			print insertSQL
			print " "
			db.query(insertSQL)
			for value in field.consolidate_list:
				insertSQL = """insert into """ + field.fieldName + field.tableName + formula.formulaName + """ (formulaValue, fieldValue, dateSelected)"""
				insertSQL += """\nselect """ + formula.formulaSQL + """, '""" + value + """ - All', InvoiceDate """ + field.fromSQL
				insertSQL += """\nwhere """ + invoiceSQL + """ and """ + field.tableName + """.""" + field.fieldName + """<>'' and """ + field.tableName + """.""" + field.fieldName + """ REGEXP '^""" + value + """'""" + skipSQL
				insertSQL += """\ngroup by InvoiceDate"""
				print insertSQL
				print " "
				db.query(insertSQL)
			deleteSQL = """delete from """ + field.fieldName + field.tableName + formula.formulaName + """ where dateSelected>'""" + dateToUse + """' or fieldValue is null or fieldValue=''"""
			print deleteSQL
			print " "
			db.query(deleteSQL)