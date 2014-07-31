import _mysql
from datetime import datetime, timedelta

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
	
formulaSQL = """select formulaName, formulaSQL, formula_id, newFormula, markForDeletion from formula_list"""
db.query(formulaSQL)
formulaQuery = db.store_result()
formulaListRaw = formulaQuery.fetch_row(maxrows=0)
for formula in formulaListRaw:
	newFormula = Formula(formula[0], formula[1], formula[2], formula[3], formula[4])
	formulaList.append(newFormula)

for formula in formulaList:
	for field in fieldList:
		dropTableSQL = """drop table if exists """ + field.fieldName + field.tableName + formula.formulaName
		print dropTableSQL
		db.query(dropTableSQL)

newFormulaSQL = """update formula_list set newFormula='Yes'"""
print newFormulaSQL
db.query(newFormulaSQL)