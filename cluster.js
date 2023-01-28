const { ClusterManager } = require('discord-hybrid-sharding');
const { config } = require('dotenv');

const manager = new ClusterManager(`./src/index.js`, {
    totalShards: 1, 
    shardsPerClusters: 2,
    mode: 'process', 
    token: config.token,
});

manager.on('clusterCreate', cluster => console.log(`Launched Cluster ${cluster.id}`));
manager.spawn({ timeout: -1 });