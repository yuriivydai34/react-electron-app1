function ConnectionState({ isConnected }: { isConnected: boolean }) {
  return (
    <div>
      <h2>Connection Status</h2>
      <p>{isConnected ? "Connected" : "Disconnected"}</p>
    </div>
  );
}
export default ConnectionState;