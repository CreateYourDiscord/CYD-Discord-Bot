const { ClusterManager } = require("discord-hybrid-sharding");

const { config } = require("./src/config.js");
const chalk = require("chalk");

async function run() {
  const manager = new ClusterManager("src/index.js", {
    mode: "process",
    shardsPerClusters: 0,
    token: config.token,
    totalClusters: "auto",
    totalShards: "auto",
  });

  manager.on("clusterCreate", (cluster) => {
    console.log(chalk.red(`[ Launched ] Cluster ${cluster.id}`));
  });

  await manager.spawn({ timeout: -1 });
}
run();
