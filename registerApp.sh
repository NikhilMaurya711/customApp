#!/bin/bash     

TOKEN=$(cat token.txt)
WORKSPACE='National Pen'
WORKSPACE_ENV='NPDev'

APP_NAME='WdyAqjr5IsCMG8xVsVox'

URL="https://api.admin.abc.cimpress.io/api/v1/resourceActions/application/register?name=${APP_NAME}"

curl --location --request POST "${URL}" --header "Authorization: Bearer ${TOKEN}" --header "x-abc-workspace: ${WORKSPACE}" --header "x-abc-workspace-env: ${WORKSPACE_ENV}" --header "Content-Type: application/zip" --data-binary "@dist/app.zip"
