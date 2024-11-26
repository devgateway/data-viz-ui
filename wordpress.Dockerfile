ARG REPO
ARG TAG
FROM ${REPO}/wp-customizer:${TAG}  AS customizer

FROM node:20-slim  AS dist
WORKDIR /tmp/work
COPY wordpress/wp-react-blocks-plugin/blocks/package.json ./
COPY wordpress/wp-react-blocks-plugin/blocks/package-lock.json ./
#Copy custom plugins
RUN --mount=type=cache,target=node_modules,id=wp_react_blocks_node_modules \
npm install
COPY wordpress/wp-react-blocks-plugin/blocks/ ./

COPY --from=customizer /tmp/work/blocks/ ../../../../custom/wp-customizer/blocks/
RUN find ../../../../custom/wp-customizer/blocks/ -exec sed -i 's|../../../../front/wordpress/wp-react-blocks-plugin/blocks/|/tmp/work/|g' {} \;


RUN npm run build

RUN mkdir -p wp-content/plugins/wp-react-blocks-plugin/blocks
RUN mv build wp-content/plugins/wp-react-blocks-plugin/blocks
COPY wordpress/wp-react-blocks-plugin/index.php wp-content/plugins/wp-react-blocks-plugin/
COPY wordpress/wp-react-blocks-plugin/blocks/*.* wp-content/plugins/wp-react-blocks-plugin/blocks/

COPY wordpress/wp-content wp-content
COPY wordpress/wp-react-custom-rest-menu/* wp-content/plugins/wp-react-custom-rest-menu/
COPY wordpress/wp-react-custom-multilang wp-content/plugins/wp-multilang
COPY wordpress/wp-theme wp-content/themes/dg-semantic


#Copy custom function file
#COPY --from=customizer /tmp/work/wp-theme/_functions.php  wp-content/themes/dg-semantic/_functions.php
#Copy custom editor.html
COPY --from=customizer /tmp/work/wp-theme/css/*  wp-content/themes/dg-semantic/css/

RUN chown -R 82:82 wp-content \
  && tar -caf /wp-content.tgz wp-content

FROM library/wordpress:6.6-fpm-alpine
COPY ./wordpress/custom/custom.ini /usr/local/etc/php/conf.d/
COPY --from=dist /wp-content.tgz /tmp
COPY wordpress.sh /usr/local/sbin/

ENTRYPOINT ["/usr/local/sbin/wordpress.sh"]
CMD ["php-fpm"]
