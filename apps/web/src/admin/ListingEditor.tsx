import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  App,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Radio,
  Result,
  Row,
  Skeleton,
  Switch,
  Typography,
} from "antd";
import { DeleteOutlined, ExportOutlined, SaveOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import type { Listing, ListingInput, Photo } from "../api/types";
import { AMENITIES } from "../data/amenities";
import { listingPath } from "../data/format";
import { adminApi, errorMessage } from "./api";
import PhotoManager from "./PhotoManager";

type FormValues = ListingInput;

const EMPTY: FormValues = {
  slug: "",
  title: "",
  headline: null,
  location: null,
  overview: null,
  locationDescription: null,
  pricePerNight: null,
  currency: "EGP",
  status: "available",
  bedrooms: null,
  bathrooms: null,
  maxGuests: null,
  areaSqm: null,
  bookingUrl: null,
  amenities: ["wifi", "weekly_cleaning", "kitchen", "toiletries"],
  isPublished: true,
  sortOrder: 0,
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/@/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function toFormValues(listing: Listing): FormValues {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, photos, ...values } = listing;
  return values;
}

export default function ListingEditor() {
  const { id: idParam } = useParams();
  const isNew = idParam === undefined;
  const id = isNew ? null : Number(idParam);
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [form] = Form.useForm<FormValues>();

  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(!isNew);
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);
  const slugEdited = useRef(!isNew);

  useEffect(() => {
    if (isNew) {
      form.setFieldsValue(EMPTY);
      return;
    }
    if (!id || Number.isNaN(id)) {
      setNotFound(true);
      return;
    }
    setLoading(true);
    adminApi
      .getListing(id)
      .then((loaded) => {
        setListing(loaded);
        form.setFieldsValue(toFormValues(loaded));
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id, isNew, form]);

  const save = async (values: FormValues) => {
    setSaving(true);
    try {
      if (isNew) {
        const created = await adminApi.createListing(values);
        message.success("Listing created — now add some photos.");
        navigate(`/admin/listings/${created.id}`, { replace: true });
      } else {
        const updated = await adminApi.updateListing(id!, values);
        setListing(updated);
        form.setFieldsValue(toFormValues(updated));
        message.success("Changes saved");
      }
    } catch (err) {
      message.error(errorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    try {
      await adminApi.deleteListing(id!);
      message.success("Listing deleted");
      navigate("/admin/listings");
    } catch (err) {
      message.error(errorMessage(err));
    }
  };

  const setPhotos = (update: (photos: Photo[]) => Photo[]) =>
    setListing((current) => (current ? { ...current, photos: update(current.photos) } : current));

  if (notFound) {
    return (
      <Result
        status="404"
        title="Listing not found"
        subTitle="It may have been deleted."
        extra={<Button onClick={() => navigate("/admin/listings")}>Back to listings</Button>}
      />
    );
  }

  if (loading) return <Skeleton active paragraph={{ rows: 12 }} />;

  return (
    <div>
      <Breadcrumb
        items={[{ title: <Link to="/admin/listings">Listings</Link> }, { title: isNew ? "New listing" : listing?.title }]}
      />
      <div className="uh-admin__page-head">
        <Typography.Title level={2}>{isNew ? "New listing" : listing?.title}</Typography.Title>
      </div>

      <Form<FormValues>
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={save}
        onFinishFailed={() => message.error("Please fix the highlighted fields.")}
        onValuesChange={(changed: Partial<FormValues>) => {
          if ("slug" in changed) slugEdited.current = true;
          if ("title" in changed && !slugEdited.current) {
            form.setFieldValue("slug", slugify(changed.title ?? ""));
          }
        }}
        scrollToFirstError
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} xl={16}>
            <Card title="Basics" className="uh-admin__card">
              <Form.Item name="title" label="Title" rules={[{ required: true, min: 2, message: "Give the listing a title" }]}>
                <Input size="large" placeholder="Modern Cozy Garden View @ Madinaty" maxLength={160} />
              </Form.Item>
              <Form.Item
                name="headline"
                label="Headline on the listing page"
                tooltip="The big text over the main photo. Leave empty to use the title."
              >
                <Input placeholder="MODERN COZY 2BR+1BA PANO GARDEN VIEW" maxLength={200} />
              </Form.Item>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item name="location" label="Location">
                    <Input placeholder="Madinaty, New Cairo" maxLength={160} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="slug"
                    label="Web address"
                    tooltip="Used in the page link. Lowercase letters, numbers and dashes."
                    rules={[
                      { required: true, message: "Required" },
                      { pattern: /^[a-z0-9]+(-[a-z0-9]+)*$/, message: "Lowercase letters, numbers and dashes only" },
                    ]}
                  >
                    <Input addonBefore="/listings/" placeholder="madinaty" maxLength={80} />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {!isNew && listing && (
              <Card title={`Photos (${listing.photos.length})`} className="uh-admin__card">
                <PhotoManager
                  photos={listing.photos}
                  onChange={setPhotos}
                  upload={(files) => adminApi.uploadListingPhotos(listing.id, files)}
                />
              </Card>
            )}

            <Card title="Description" className="uh-admin__card">
              <Form.Item name="overview" label="Overview">
                <Input.TextArea autoSize={{ minRows: 4, maxRows: 12 }} maxLength={5000} showCount placeholder="Welcome to your perfect getaway!…" />
              </Form.Item>
              <Form.Item name="locationDescription" label="About the location">
                <Input.TextArea autoSize={{ minRows: 3, maxRows: 10 }} maxLength={5000} showCount placeholder="Distances, nearby places, how to get there…" />
              </Form.Item>
            </Card>

            <Card title="Details" className="uh-admin__card">
              <Row gutter={16}>
                {(
                  [
                    ["bedrooms", "Bedrooms"],
                    ["bathrooms", "Bathrooms"],
                    ["maxGuests", "Max guests"],
                  ] as const
                ).map(([name, label]) => (
                  <Col xs={12} md={6} key={name}>
                    <Form.Item name={name} label={label}>
                      <InputNumber min={0} max={1000} precision={0} style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                ))}
                <Col xs={12} md={6}>
                  <Form.Item name="areaSqm" label="Area">
                    <InputNumber min={0} addonAfter="m²" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="amenities" label="Amenities">
                <Checkbox.Group className="uh-admin__amenities">
                  {AMENITIES.map(({ key, label, icon: Icon }) => (
                    <Checkbox key={key} value={key}>
                      <Icon /> {label}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </Form.Item>
            </Card>
          </Col>

          <Col xs={24} xl={8}>
            <div className="uh-admin__sticky">
              <Card title="Publishing" className="uh-admin__card">
                <Form.Item name="isPublished" label="Show on website" valuePropName="checked">
                  <Switch checkedChildren="Visible" unCheckedChildren="Hidden" />
                </Form.Item>
                <Form.Item name="status" label="Availability">
                  <Radio.Group optionType="button" buttonStyle="solid">
                    <Radio value="available">Available</Radio>
                    <Radio value="coming_soon">Coming soon</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name="sortOrder" label="Display order" tooltip="Lower numbers appear first.">
                  <InputNumber min={-10000} max={10000} precision={0} style={{ width: "100%" }} />
                </Form.Item>
                <Button type="primary" size="large" block htmlType="submit" icon={<SaveOutlined />} loading={saving}>
                  {isNew ? "Create listing" : "Save changes"}
                </Button>
                {!isNew && listing && (
                  <div className="uh-admin__side-actions">
                    <Button icon={<ExportOutlined />} href={listingPath(listing.slug)} target="_blank" disabled={!listing.isPublished}>
                      View on website
                    </Button>
                    <Popconfirm
                      title="Delete this listing?"
                      description={`This also deletes its ${listing.photos.length} photo(s). It can’t be undone.`}
                      okText="Delete"
                      okButtonProps={{ danger: true }}
                      onConfirm={remove}
                    >
                      <Button danger icon={<DeleteOutlined />}>
                        Delete
                      </Button>
                    </Popconfirm>
                  </div>
                )}
              </Card>

              <Card title="Price & booking" className="uh-admin__card">
                <Row gutter={12}>
                  <Col span={16}>
                    <Form.Item name="pricePerNight" label="Price per night" tooltip="Leave empty to show “Price on request”.">
                      <InputNumber min={0} style={{ width: "100%" }} placeholder="1750" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="currency" label="Currency" rules={[{ required: true, len: 3, message: "3 letters" }]}>
                      <Input maxLength={3} style={{ textTransform: "uppercase" }} />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="bookingUrl"
                  label="Booking link"
                  tooltip="Where “Book now” goes, e.g. the Airbnb listing."
                  rules={[{ type: "url", message: "Enter a full link starting with https://" }]}
                >
                  <Input placeholder="https://www.airbnb.com/rooms/…" />
                </Form.Item>
              </Card>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
