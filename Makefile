uglifyjs:
	for n in `ls -1 *.js | grep -v ".min."`; do uglifyjs.terser -m -c -o `echo $$n | sed -e "s/\.js$$/.min.js/"` $$n; done

deploy-bleeding:
	npm rebuild node-sass || true
	yarn build-bleeding
	aws s3 sync build/ s3://site-go-bleeding.onva.io-contents/
	aws cloudfront create-invalidation --distribution-id E2B8JB7V8VMOV2 --paths "/*"

deploy-prod:
	npm rebuild node-sass || true
	yarn build
	aws s3 sync build/ s3://site-go.onva.io-contents/
	aws cloudfront create-invalidation --distribution-id E3FXQCWR11F8N4 --paths "/*"

# vim: noet
