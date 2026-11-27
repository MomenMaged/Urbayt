import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { App, Button, Empty, Popconfirm, Space, Switch, Table, Tag, Tooltip, Typography } from "antd";
import { DeleteOutlined, EditOutlined, ExportOutlined, PlusOutlined } from "@ant-design/icons";
import type { Listing } from "../api/types";
import { formatPrice, listingPath } from "../data/format";
import { adminApi, errorMessage } from "./api";

export default function ListingsPage() {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setListings(await adminApi.listListings());
    } catch (err) {
      message.error(errorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [message]);

  useEffect(() => {
    load();
  }, [load]);

  const togglePublished = async (listing: Listing, isPublished: boolean) => {
    setBusyId(listing.id);
    try {
      const updated = await adminApi.updateListing(listing.id, { isPublished });
      setListings((all) => all.map((item) => (item.id === updated.id ? updated : item)));
      message.success(isPublished ? "Listing is now visible on the website" : "Listing hidden from the website");
    } catch (err) {
      message.error(errorMessage(err));
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (listing: Listing) => {
    setBusyId(listing.id);
    try {
      await adminApi.deleteListing(listing.id);
      setListings((all) => all.filter((item) => item.id !== listing.id));
      message.success(`Deleted “${listing.title}”`);
    } catch (err) {
      message.error(errorMessage(err));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <div className="uh-admin__page-head">
        <div>
          <Typography.Title level={2}>Listings</Typography.Title>
          <Typography.Text type="secondary">
            Everything here appears on the website’s “Our listings” page, in this order.
          </Typography.Text>
        </div>
        <Button type="primary" size="large" icon={<PlusOutlined />} onClick={() => navigate("/admin/listings/new")}>
          New listing
        </Button>
      </div>

      <Table<Listing>
        rowKey="id"
        loading={loading}
        dataSource={listings}
        pagination={false}
        scroll={{ x: 900 }}
        className="uh-admin__table"
        locale={{ emptyText: <Empty description="No listings yet. Create your first one." /> }}
        onRow={(listing) => ({ onDoubleClick: () => navigate(`/admin/listings/${listing.id}`) })}
        columns={[
          {
            title: "Photo",
            width: 96,
            render: (_, listing) =>
              listing.photos[0] ? (
                <img className="uh-admin__thumb" src={listing.photos[0].url} alt="" />
              ) : (
                <div className="uh-admin__thumb uh-admin__thumb--empty">No photo</div>
              ),
          },
          {
            title: "Listing",
            render: (_, listing) => (
              <div>
                <Link to={`/admin/listings/${listing.id}`} className="uh-admin__title-link">
                  {listing.title}
                </Link>
                <div className="uh-admin__muted">
                  {listing.location ?? "No location"} · /{listing.slug}
                </div>
              </div>
            ),
          },
          {
            title: "Status",
            width: 130,
            render: (_, listing) =>
              listing.status === "available" ? <Tag color="gold">Available</Tag> : <Tag color="blue">Coming soon</Tag>,
          },
          {
            title: "Price / night",
            width: 140,
            render: (_, listing) => formatPrice(listing) ?? <span className="uh-admin__muted">—</span>,
          },
          { title: "Photos", width: 90, render: (_, listing) => listing.photos.length },
          {
            title: "On website",
            width: 110,
            render: (_, listing) => (
              <Switch
                checked={listing.isPublished}
                loading={busyId === listing.id}
                onChange={(checked) => togglePublished(listing, checked)}
              />
            ),
          },
          {
            title: "",
            width: 150,
            fixed: "right",
            render: (_, listing) => (
              <Space>
                <Tooltip title="Edit">
                  <Button icon={<EditOutlined />} onClick={() => navigate(`/admin/listings/${listing.id}`)} />
                </Tooltip>
                <Tooltip title={listing.isPublished ? "View on website" : "Hidden — publish it to view"}>
                  <Button
                    icon={<ExportOutlined />}
                    disabled={!listing.isPublished}
                    href={listingPath(listing.slug)}
                    target="_blank"
                  />
                </Tooltip>
                <Popconfirm
                  title={`Delete “${listing.title}”?`}
                  description={`This also deletes its ${listing.photos.length} photo(s). It can’t be undone.`}
                  okText="Delete"
                  okButtonProps={{ danger: true }}
                  onConfirm={() => remove(listing)}
                >
                  <Tooltip title="Delete">
                    <Button danger icon={<DeleteOutlined />} loading={busyId === listing.id} />
                  </Tooltip>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />
    </div>
  );
}
