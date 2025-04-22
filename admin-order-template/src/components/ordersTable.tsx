import React, { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef
} from "material-react-table";
import { Box, Typography, Chip, Link } from "@mui/material";
import axios from 'axios'
import { Check, Schedule } from "@mui/icons-material";
import DetailPanel from "./DetailPanel";
import { useNavigate } from "react-router-dom";

type OrderItem = {
  id: string;
  material: string;
  thickness: string;
  dimensions: string;
  surface: string;
  surfaceCost: string;
  cutting: string;
  cuttingCost: string;
  loops: string;
  loopCost: string;
  setupPrice: string;
  unitPrice: string;
  qty: string;
  file: string;
};

type Order = {
  total_amount: any;
  _id: string;
  id: number;
  price: number;
  name: string;
  phone: string;
  address: string;
  vat: string;
  updated: string;
  status: "Calculator Only" | "Pending";
  created?: string;
  email?: string;
  details: OrderItem[];
};

// const data: Order[] = [
//   {
//     id: 7,
//     price: 12.09,
//     name: "dfgsadfg dsfh",
//     phone: "+48346346342",
//     address: "fdghfgi, Poland 🇵🇱",
//     vat: "",
//     updated: "20:05, 25 Jan, 25",
//     status: "Pending",
//     created: "20:04, 25 Jan, 25",
//     email: "glywinski@gmail.com",
//     details: [
//       {
//         id: "#1",
//         material: "Steel S235 / 1.0038",
//         thickness: "6.0 mm",
//         dimensions: "182.5 mm x 45.74 mm",
//         surface: "0.0083 x 41.958",
//         surfaceCost: "0.35",
//         cutting: "0.7016 x 0.932",
//         cuttingCost: "0.65",
//         loops: "5 x 0.098",
//         loopCost: "0.49",
//         setupPrice: "3.27",
//         unitPrice: "4.76",
//         qty: "1 x 4.76",
//         file: "blotnik2_ver3.dxf"
//       },
//       {
//         id: "#2",
//         material: "Steel S235 / 1.0038",
//         thickness: "6.0 mm",
//         dimensions: "219.17 mm x 68.78 mm",
//         surface: "0.0151 x 41.958",
//         surfaceCost: "0.63",
//         cutting: "0.7326 x 0.932",
//         cuttingCost: "0.68",
//         loops: "5 x 0.098",
//         loopCost: "0.49",
//         setupPrice: "3.27",
//         unitPrice: "5.07",
//         qty: "1 x 5.07",
//         file: "blotnik2_verA7.dxf"
//       }
//     ]
//   }
// ];


const OrdersTable = () => {
  const [data, setData] = useState<Order[]>([]); 
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/api/orders");
        setData(response.data);  
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);
  console.log('orders data',data)
  const columns = useMemo<MRT_ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        Cell: ({ row }) => (
          <Box fontWeight="bold">#{row.original._id}</Box>
        )
      },
      {
        accessorKey: "price",
        header: "Price",
        Cell: ({ row }) => row.original.total_amount?.toFixed(2)
      },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "phone", header: "Phone" },
      { accessorKey: "address", header: "Address" },
      // {
      //   accessorKey: "updated",
      //   header: "Updated",
      //   Cell: ({ row }) => (
      //     <Box sx={{ color: "#666", fontSize: "0.85rem" }}>
      //       {row.original.updated}
      //     </Box>
      //   )
      // },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) => {
          const val = cell.getValue<string>();

          return (
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: "6px",
                padding: "4px 8px",
                fontSize: "0.875rem",
                minWidth: 120,
                backgroundColor: "#fff",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: "50%",
                  right: "8px",
                  width: 0,
                  height: 0,
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderTop: "5px solid #999",
                  transform: "translateY(-50%)",
                  pointerEvents: "none"
                }
              }}
            >
              {val}
            </Box>
          );
        }
      }
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableExpandAll: false,
    renderDetailPanel: ({ row }) => (
      <Box p={2} sx={{ backgroundColor: "#f8f9fa" }}>
        <DetailPanel order={row.original} />
      </Box>
    ),

    muiTableContainerProps: {
      sx: {
        height: "400px",
        overflow: "auto",
      }
    },

    muiTablePaperProps: {
      sx: {
        height: "100%", // Ensure the paper takes full height
        display: "flex",
        flexDirection: "column"
      }
    },
    muiTableBodyProps: {
      sx: {
        minHeight: "350px"
      }
    }
  });
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default OrdersTable;
