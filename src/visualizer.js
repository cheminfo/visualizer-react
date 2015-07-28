'use strict';

module.exports = '<!DOCTYPE html>\n<html>\n<head>\n    <script src="https://www.lactame.com/lib/jquery/2.1.1/jquery.min.js"></script>\n    <script src="https://www.lactame.com/lib/uri.js/1.14.1/URI.min.js"></script>\n    {{scripts}}\n</head>\n<body>\n<script>\n    \'use strict\';\n    function checkVersion(versions, version) {\n        version = version.toLowerCase();\n        if (version.indexOf("v") != 0 && version !== \'head\') version = "v" + version;\n        var idx = versions.indexOf(version);\n        if (idx > -1) {\n            version = versions[idx];\n        }\n        else {\n            return null;\n        }\n        return version;\n    }\n    window.onload = function () {\n        $.getJSON(\'https://www.lactame.com/visualizer/versions.php\').then(function (versions) {\n            versions.push(\'head\');\n            var url;\n            var uri = new URI(window.location.href);\n            var search = uri.search(true);\n            var version;\n            if (search.viewURL) {\n                url = search.viewURL;\n            }\n            if (search.v) {\n                version = checkVersion(versions, search.v);\n            }\n            if (!version) {\n                version = \'HEAD\';\n            }\n            if (!search.loadversion) {\n                addVisualizer(version, search);\n\n            }\n            else {\n                $.ajax({\n                    url: url,\n                    dataType: \'json\',\n                    type: \'GET\',\n                    success: function (data) {\n                        addVisualizer(checkVersion(versions, data.version), search);\n                    },\n                    error: function (err) {\n                        console.log(\'error\', err);\n                    }\n                })\n            }\n        });\n\n        function addVisualizer(version, search) {\n            var cdn = \'{{ cdn }}\';\n            var visualizer = document.createElement(\'script\');\n            var prefix = cdn;\n            var datamain = prefix + \'/\' + version + \'/init\';\n            var requirejs = prefix + \'/\' + version + \'/components/requirejs/require.js\';\n\n            visualizer.setAttribute(\'data-main\', datamain);\n            visualizer.setAttribute(\'src\', requirejs);\n            document.head.appendChild(visualizer);\n        }\n    }\n</script>\n<table>\n<tr>\n    <td class="left"></td>\n    <td colspan="3">\n        <div id="ci-visualizer" style="margin-top: 15px;"/>\n    </td>\n    <td class="right"></td>\n</tr>\n</table>\n</body>\n</html>';