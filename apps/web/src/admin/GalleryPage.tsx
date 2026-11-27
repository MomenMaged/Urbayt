import { useEffect, useState } from "react";
import { App, Card, Skeleton, Typography } from "antd";
import type { Photo } from "../api/types";
import { adminApi, errorMessage } from "./api";
import PhotoManager from "./PhotoManager";

export default function GalleryPage() {
  const { message } = App.useApp();
  const [photos, setPhotos] = useState<Photo[] | null>(null);

  useEffect(() => {
    adminApi
      .getGallery("home_carousel")
      .then(setPhotos)
      .catch((err) => {
        message.error(errorMessage(err));
        setPhotos([]);
      });
  }, [message]);

  return (
    <div>
      <div className="uh-admin__page-head">
        <div>
          <Typography.Title level={2}>Home carousel</Typography.Title>
          <Typography.Text type="secondary">
            The photo slideshow on the home page, below “Book now”. Photos play in this order.
          </Typography.Text>
        </div>
      </div>
      <Card>
        {photos === null ? (
          <Skeleton active />
        ) : (
          <PhotoManager
            photos={photos}
            onChange={(update) => setPhotos((current) => update(current ?? []))}
            upload={(files) => adminApi.uploadGalleryPhotos("home_carousel", files)}
            coverLabel="First"
          />
        )}
      </Card>
    </div>
  );
}
