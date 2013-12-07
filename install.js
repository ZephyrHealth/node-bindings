var fs = require('fs')
  , path = require('path')
  , join = path.join
  , dirname = path.dirname
  , exists = fs.existsSync || path.existsSync

var pkg = require(path.join(process.cwd(), 'package.json'));

var exec = require('child_process').exec
		, child
	  , zephyr_compiled = process.env.ZEPHYR_NODE_BINDINGS_COMPILED_DIR || 'zephyr_compiled'
	  , zdir = path.join(zephyr_compiled, pkg.name, process.versions.node, process.platform, process.arch)
	  , cwd = path.join(process.cwd(), '..');

var log = function (error, stdout, stderr) {
	console.log('stdout: ' + stdout);
	console.log('stderr: ' + stderr);
	if (error !== null) {
		console.log('exec error: ' + error);
	}
}

// 1. mkdir
child = exec('mkdir -p ' + zdir, log);

// 2. copy
child = exec('cp -vf build/Release/*.node ' + zdir, log);
