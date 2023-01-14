const { ClusterManager } = require("discord-hybrid-sharding");

const chalk = require("chalk");

require("dotenv").config(
);

async function run() {
  const manager = new ClusterManager("src/index.js", {
    mode: "process",
    shardsPerClusters: 0,
    token: process.env.token,
    totalClusters: "auto",
    totalShards: "auto",
  });

  manager.on("clusterCreate", (cluster) => {
    console.log(chalk.red(`[ Launched ] Cluster ${cluster.id}`));
  });

  await manager.spawn({ timeout: -1 });
}
run();
