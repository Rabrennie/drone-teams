function snakeToCamel(s){
    return s.replace(/(\_\w)/g, function(m){return m[1].toUpperCase();});
}

exports.parse = () => {
    const args = {};

    Object.keys(process.env).forEach((k) => {
        const m = k.match(/(^DRONE_(.*)|PLUGIN_(.*))/);
        if(!m) {
            return;
        }
        const key = m[2] || m[3];

        args[snakeToCamel(key.toLowerCase())] = process.env[k];
    });

    return args;
}