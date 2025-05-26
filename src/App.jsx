import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const App = () => {
  const [result, setResult] = useState("—");
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!scannerRef.current) return;

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 100 },
    };

    const onScanSuccess = (decodedText, decodedResult) => {
      setResult(decodedText);
      html5QrcodeScanner.clear(); // остановить после успешного сканирования
    };

    const html5QrcodeScanner = new Html5QrcodeScanner(
      scannerRef.current.id,
      config
    );

    html5QrcodeScanner.render(onScanSuccess);

    // Очистка при размонтировании компонента
    return () => {
      html5QrcodeScanner.clear().catch(() => {
        // игнорируем ошибки очистки
      });
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Сканируйте штрихкод:</h3>
      <div id="reader" ref={scannerRef} style={{ width: 300 }}></div>
      <div>
        Результат: <span>{result}</span>
      </div>
    </div>
  );
};

export default App;
