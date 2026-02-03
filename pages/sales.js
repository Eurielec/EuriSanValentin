import { useEffect, useState, useCallback } from "react";
import supabase from "../utils/supabase"; 
import { Line, Doughnut, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, 
  Title, Tooltip, Legend, PointElement, LineElement, Filler
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, PointElement, LineElement, Filler);

export default function Sales() {
  const [hasMounted, setHasMounted] = useState(false);
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);

  const INVERSION_INICIAL = 100;

  useEffect(() => { setHasMounted(true); }, []);

  const fetchSalesData = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await fetch("/api/sales", {
        headers: { "x-api-key": process.env.NEXT_PUBLIC_API_KEY },
      });
      const result = await response.json();
      setSalesData(result);
    } catch (err) {
      console.error("Error cargando datos:", err);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(false);
    try {
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/config?key=eq.config&select=value`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
        }
      });
      const data = await response.json();
      if (data && data.length > 0 && data[0].value.trim() === passwordInput.trim()) {
        setIsAuthenticated(true);
        fetchSalesData();
      } else {
        setAuthError(true);
      }
    } catch (err) {
      setAuthError(true);
    } finally {
      setLoading(false);
    }
  };

  if (!hasMounted) return null;

  if (!isAuthenticated) {
    return (
      <div className="login-screen">
        <div className="login-card">
          <h1 className="lobster-title">Control de Acceso</h1>
          <form onSubmit={handleLogin}> 
            <input 
              type="password" 
              value={passwordInput} 
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Clave de seguridad"
              className={`login-input ${authError ? 'error-border' : ''}`}
            />
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Verificando..." : "Entrar al Panel"}
            </button>
            {authError && <p className="error-text">Clave incorrecta</p>}
          </form>
        </div>
      </div>
    );
  }

  // --- PROCESAMIENTO DE DATOS ---
  const rawData = salesData?.salesData || [];
  
  const sortedSales = [...rawData].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  let runningTotal = 0;
  const acumuladoData = sortedSales.map(sale => {
    if (sale.paid) {
      let p = 0;
      if (sale.product_type === "piruleta") p = 0.4;
      else if (sale.product_type === "chocolate") p = 0.8;
      else if (sale.product_type === "piruletaYchocolate") p = 1.2;
      runningTotal += p;
    }
    return { t: new Date(sale.created_at).toLocaleDateString(), y: runningTotal };
  });

  const stats = rawData.reduce((acc, sale) => {
    let precio = 0;
    const tipo = sale.product_type || "Otro";
    acc.productos[tipo] = (acc.productos[tipo] || 0) + 1;

    if (sale.product_type === "piruleta") precio = 0.4;
    else if (sale.product_type === "chocolate") precio = 0.8;
    else if (sale.product_type === "piruletaYchocolate") precio = 1;

    acc.estimado += precio;

    if (sale.paid) {
        acc.real += precio;
        acc.numPagados += 1;
        
        const metodo = sale.payment_method || "Pendiente";
        acc.metodos[metodo] = (acc.metodos[metodo] || 0) + 1;
    }

    if (sale.email && sale.product_type?.includes("piruleta")) {
      acc.piruletasPorEmail[sale.email] = (acc.piruletasPorEmail[sale.email] || 0) + 1;
    }

    const fechaObj = new Date(sale.created_at);
    
    const hora = fechaObj.getHours();
    acc.horas[hora] = (acc.horas[hora] || 0) + 1;

    const dia = `${fechaObj.getDate()}/${fechaObj.getMonth() + 1}`;
    acc.dias[dia] = (acc.dias[dia] || 0) + 1;

    return acc;
  }, { estimado: 0, real: 0, numPagados: 0, productos: {}, piruletasPorEmail: {}, horas: {}, dias: {}, metodos: {} });

  const ticketMedio = stats.numPagados > 0 ? (stats.real / stats.numPagados).toFixed(2) : 0;
  const totalOfertas = Object.values(stats.piruletasPorEmail).reduce((total, num) => total + Math.floor(num / 3), 0);
  const impactoPromos = totalOfertas * 0.20;
  const porcentajeCobrado = stats.estimado > 0 ? ((stats.real / stats.estimado) * 100).toFixed(1) : 0;
  const balanceReal = stats.real - INVERSION_INICIAL;

  return (
    <div className="sales-dashboard">
      <header className="header-dashboard">
        <button className={`refresh-btn ${refreshing ? 'spinning' : ''}`} onClick={fetchSalesData}>
          {refreshing ? "..." : "Refrescar"}
        </button>
      </header>

      <section className="metrics-grid">
        <div className="info-card">
          <h3>Tesorería</h3>
          <div className="metric-row">
            <div className="metric-item">
              <span className="label">Teórico </span>
              <span className="amount estimated">{stats.estimado.toFixed(2)}€</span>
            </div>
            <div className="metric-item">
              <span className="label">Caja Real</span>
              <span className="amount real"> {stats.real.toFixed(2)}€</span>
            </div>
          </div>
        </div>
      
        <div className="progress-section info-card" style={{marginBottom: '20px'}}>
          <div className="progress-label"><span>Eficiencia de Cobro</span><strong>{porcentajeCobrado}%</strong></div>
          <div className="bar-bg"><div className="bar-fill" style={{ width: `${Math.max(porcentajeCobrado, 1)}%` }}></div></div>
        </div>

        <div className="info-card ticket-card">
            <h3>Ticket Medio</h3>
            <span className="amount ticket">{ticketMedio}€</span>
            <span className="label"> por persona pagada</span>
        </div>

        <div className={`info-card balance-card ${balanceReal >= 0 ? "profit" : "loss"}`}>
          <h3>Balance Inversión</h3>
          <span className="balance-amount">{balanceReal.toFixed(2)}€</span>
          <p className="balance-status">{balanceReal >= 0 ? " Beneficio Total :)" : " Por debajo de meta :("}</p>
        </div>

        <div className="info-card offer-card">
          <h3>Impacto Promos</h3>
          <div className="offer-content">
            <span className="amount offers">{totalOfertas}</span>
            <span className="label">Packs 3x1€</span>
            <hr style={{margin: '10px 0', opacity: 0.1, border: '0', borderTop: '1px solid #000'}} />
            <span className="amount loss" style={{color: '#e63946', fontSize: '1.1rem'}}>
               -{impactoPromos.toFixed(2)}€ margen
            </span>
          </div>
        </div>
      </section>

      <section className="charts-grid">
        <div className="chart-card wide">
          <h3>Crecimiento de Caja (Acumulado)</h3>
          <div className="canvas-container">
            <Line 
              data={{
                labels: acumuladoData.map((_, i) => i + 1),
                datasets: [{ 
                  label: "Euros acumulados", 
                  data: acumuladoData.map(d => d.y), 
                  borderColor: "#2a9d8f", 
                  backgroundColor: "rgba(42, 157, 143, 0.1)", 
                  fill: true,
                  pointRadius: 0
                }]
              }} 
              options={{ maintainAspectRatio: false }} 
            />
          </div>
        </div>

        <div className="chart-card">
          <h3>Pedidos por Día</h3>
          <div className="canvas-container">
            <Bar 
              data={{
                labels: Object.keys(stats.dias),
                datasets: [{ label: "Pedidos", data: Object.values(stats.dias), backgroundColor: "#457b9d", borderRadius: 5 }]
              }} 
              options={{ maintainAspectRatio: false }} 
            />
          </div>
        </div>

        <div className="chart-card">
          <h3>Mix de Productos</h3>
          <div className="canvas-container">
            <Pie 
              data={{
                labels: Object.keys(stats.productos),
                datasets: [{ data: Object.values(stats.productos), backgroundColor: ["#ff9f43", "#ee5253", "#0abde3", "#10ac84"] }]
              }} 
              options={{ maintainAspectRatio: false }} 
            />
          </div>
        </div>

        <div className="chart-card">
          <h3>Métodos de Pago (Ventas Reales)</h3>
          <div className="canvas-container">
            <Doughnut 
              data={{
                labels: Object.keys(stats.metodos),
                datasets: [{ data: Object.values(stats.metodos), backgroundColor: ["#2a9d8f", "#e9c46a", "#f4a261", "#e63946"] }]
              }} 
              options={{ maintainAspectRatio: false, cutout: "70%" }} 
            />
          </div>
        </div>
      </section>
    </div>
  );
}