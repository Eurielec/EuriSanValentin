import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Sales() {
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSalesData() {
      try {
        const response = await fetch("/api/sales", {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener los datos de ventas");
        }
        const data = await response.json();
        setSalesData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSalesData();
  }, []);

  const calculateSalesSummary = (data) => {
    if (!data || !data.salesData) return { piruletas: 0, chocolates: 0, ingresosEstimados: 0, ingresosReales: 0, ofertas: 0 };

    const piruletasPorPersona = {};

    const summary = data.salesData.reduce(
      (acc, sale) => {
        if (sale.product_type === "piruleta") {
          acc.piruletas += 1;
          piruletasPorPersona[sale.email] = (piruletasPorPersona[sale.email] || 0) + 1;
        } else if (sale.product_type === "chocolate") {
          acc.chocolates += 1;
        } else if (sale.product_type === "piruletaYchocolate") {
          acc.piruletas += 1;
          acc.chocolates += 1;
        }

        // Calcular ingresos estimados
        if (sale.product_type === "piruleta") {
          acc.ingresosEstimados += 0.4;
        } else if (sale.product_type === "chocolate") {
          acc.ingresosEstimados += 0.8;
        } else if (sale.product_type === "piruletaYchocolate") {
          acc.ingresosEstimados += 1.2;
        }

        // Calcular ingresos reales si está pagado
        if (sale.paid) {
          if (sale.product_type === "piruleta") {
            acc.ingresosReales += 0.4;
          } else if (sale.product_type === "chocolate") {
            acc.ingresosReales += 0.8;
          } else if (sale.product_type === "piruletaYchocolate") {
            acc.ingresosReales += 1.2;
          }
        }

        return acc;
      },
      { piruletas: 0, chocolates: 0, ingresosEstimados: 0, ingresosReales: 0, ofertas: 0 }
    );

    // Calcular ofertas
    summary.ofertas = Object.values(piruletasPorPersona).reduce((acc, piruletas) => {
      return acc + Math.floor(piruletas / 3);
    }, 0);

    return summary;
  };

  const salesSummary = calculateSalesSummary(salesData);
  const inversionOriginal = 100;
  const balanceReal = salesSummary.ingresosReales - inversionOriginal;
  const balanceEstimado = salesSummary.ingresosEstimados - inversionOriginal;
  const balanceRealPercentage = ((balanceReal / inversionOriginal) * 100).toFixed(2);
  const balanceEstimadoPercentage = ((balanceEstimado / inversionOriginal) * 100).toFixed(2);

  const salesHistogramData = salesData ? generateSalesHistogramData(salesData) : null;

  if (!salesData) return <p>No hay datos para mostrar.</p>;

  if (loading) return <p>Cargando datos de ventas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="sales-container">
      <h1>Resumen de Ventas</h1>
      <p>Piruletas vendidas: {salesSummary.piruletas}</p>
      <p>Chocolates vendidos: {salesSummary.chocolates}</p>
      <p>Ofertas aplicadas: {salesSummary.ofertas}</p>
      <p>Ingresos estimados: {salesSummary.ingresosEstimados.toFixed(2)}€</p>
      <p>Ingresos reales: {salesSummary.ingresosReales.toFixed(2)}€</p>
      <p className={balanceReal >= 0 ? "positive-balance" : "negative-balance"}>
        Balance real: {balanceReal.toFixed(2)}€ ({balanceRealPercentage}%)
      </p>
      <p className={balanceEstimado >= 0 ? "positive-balance" : "negative-balance"}>
        Balance estimado: {balanceEstimado.toFixed(2)}€ ({balanceEstimadoPercentage}%)
      </p>

      {salesHistogramData && (
        <div className="sales-histogram">
          <h2>Histograma de Ventas por Día</h2>
          <Bar data={salesHistogramData} options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Ventas por Día",
              },
            },
          }} />
        </div>
      )}
    </div>
  );
}

function generateSalesHistogramData(salesData) {
  const salesByDate = {};

  salesData.salesData.forEach((sale) => {
    const date = new Date(sale.date);
    if (!isNaN(date.getTime())) {
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      salesByDate[formattedDate] = (salesByDate[formattedDate] || 0) + 1;
    }
  });

  const labels = Object.keys(salesByDate);
  const data = Object.values(salesByDate);

  return {
    labels,
    datasets: [
      {
        label: "Ventas por día",
        data,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
}

export default Sales;