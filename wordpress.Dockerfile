
FROM node:12.22.10  AS dist
WORKDIR /tmp/work
COPY wordpress/wp-react-blocks-plugin/blocks/package.json ./
RUN npm install
COPY wordpress/wp-react-blocks-plugin/blocks/ ./
RUN npm run build

RUN mkdir -p wp-content/plugins/wp-react-blocks-plugin/blocks
RUN mv build wp-content/plugins/wp-react-blocks-plugin/blocks
COPY wordpress/wp-react-blocks-plugin/index.php wp-content/plugins/wp-react-blocks-plugin/
COPY wordpress/wp-react-blocks-plugin/blocks/*.* wp-content/plugins/wp-react-blocks-plugin/blocks/

COPY wordpress/wp-content wp-content
COPY wordpress/wp-react-custom-rest-menu/* wp-content/plugins/wp-react-custom-rest-menu/
COPY wordpress/wp-react-custom-multilang wp-content/plugins/wp-multilang
COPY wordpress/wp-theme wp-content/themes/dg-semantic

RUN chown -R 82:82 wp-content \
  && tar -caf /wp-content.tgz wp-content

FROM library/wordpress:6.2.2-fpm-alpine
COPY ./wordpress/custom/custom.ini /usr/local/etc/php/conf.d/
COPY --from=dist /wp-content.tgz /tmp
COPY wordpress.sh /usr/local/sbin/

ENTRYPOINT ["/usr/local/sbin/wordpress.sh"]
CMD ["php-fpm"]
