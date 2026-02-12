import { Table, Card, Spin } from "antd";
import { useWallet } from "../features/wallet/api/use-wallet-query";

interface History {
  balance: number;
  date: string;
}

const HomePage = () => {
  const { data, isLoading, isError } = useWallet();

  if (isLoading) return <Spin description="Loading..." />;
  if (isError) return <p>Error loading wallet data.</p>;

  const columns = [
    {
      title: "Tanggal",
      dataIndex: "date",
      key: "date",
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: "Jumlah Topup",
      dataIndex: "balance",
      key: "balance",
      render: (amount: number) =>
        amount != null
          ? amount.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })
          : "-",
    },
  ];
  return (
    <div className="p-5">
      <Card title="Saldo Saat Ini" className="mb-5!">
        <h2>
          {data?.data.balance != null
            ? data.data.balance.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })
            : "Rp. 0"}
        </h2>
      </Card>

      <Card title="Riwayat Topup">
        <Table
          dataSource={data?.data.history || []}
          columns={columns}
          rowKey={(record: History) => record.date}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default HomePage;
