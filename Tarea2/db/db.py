import pymysql


def getConnection():
  conn = pymysql.connect(
    db='tarea2',
    user='cc5002',
    passwd='programacionweb',
    host='localhost',
    charset='utf8'
  )
  return conn


