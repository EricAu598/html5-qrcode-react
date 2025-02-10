import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';

const qrcodeRegionId = "html5qr-code-full-region";

// Creates the configuration object for Html5QrcodeScanner
const createConfig = (props) => {
  let config = {
    // Set to true to automatically request camera permission
    rememberLastUsedCamera: true,
    // Automatically start scanning after camera is selected
    autoStartScan: true,
    // Hide the start/stop button
    showStartScanButton: false,
    // Show the camera selection dropdown
    showTorchButtonIfSupported: true
  };

  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }

  return config;
};

const Html5QrcodePlugin = (props) => {
  useEffect(() => {
    // when component mounts
    const config = createConfig(props);
    const verbose = props.verbose === true;

    // Success callback is required
    if (!(props.qrCodeSuccessCallback)) {
      throw "qrCodeSuccessCallback is required callback.";
    }

    // Create scanner instance with auto-start config
    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose
    );

    // Render scanner and immediately request camera access
    html5QrcodeScanner.render(
      props.qrCodeSuccessCallback,
      props.qrCodeErrorCallback
    );

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner.clear().catch(error => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []); // empty dependency array means this runs once on mount

  return (
    <div id={qrcodeRegionId} />
  );
};

export default Html5QrcodePlugin;