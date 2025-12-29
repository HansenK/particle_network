import ParticleNetwork from "./particle-network.js";

const canvas = document.getElementById("canvas");
const particleNetwork = new ParticleNetwork(canvas);
particleNetwork.start();

export default particleNetwork;
