export default function getContainerState(containerId) {
    return window.ContainerState && window.ContainerState[containerId];
}
