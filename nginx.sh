#!/bin/sh -e

SED_EXPR="$(env | grep '^REACT_APP_' | while IFS='=' read NAME VALUE; do
  echo "s!#$NAME#!$VALUE!g;"
done | tr '\n' ' ')"
if [ -n "$SED_EXPR" ]; then
  echo "Replacing variables..."
  find . -name '*.js' -print0 | xargs -rt0 sed -i -e "$SED_EXPR"
else
  echo 'No REACT_APP_* variables set'
fi
echo Clearing Nginx caches...
(
  cd /var/cache/nginx
  CACHE_DIRS='render wp'
  mkdir -p $CACHE_DIRS
  chown nginx $CACHE_DIRS
  find $CACHE_DIRS -mindepth 1 -delete
)
# continue normal Nginx startup
exec /docker-entrypoint.sh "$@"
