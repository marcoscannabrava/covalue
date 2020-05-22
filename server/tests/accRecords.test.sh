# Run the command below from root app folder before trying to execute this test
# chmod +x server/tests/accRecords.test.sh
curl -F 'file=@/home/marcos/code/marcoscannabrava/covalue/server/tests/base.xlsx' 'http://localhost:8000/api/upload'

