import { useState } from "react";
import { App, Button, Input, Popconfirm, Tooltip, Upload } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined, DeleteOutlined, InboxOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import type { Photo } from "../api/types";
import { adminApi, errorMessage } from "./api";

const ACCEPT = "image/jpeg,image/png,image/webp,image/avif,image/gif";
const MAX_MB = 15;

interface PhotoManagerProps {
  photos: Photo[];
  /** Receives an updater, like a React state setter. */
  onChange: (update: (photos: Photo[]) => Photo[]) => void;
  upload: (files: File[]) => Promise<Photo[]>;
  /** What the first photo is used for, shown on its badge. */
  coverLabel?: string;
}

export default function PhotoManager({ photos, onChange, upload, coverLabel = "Cover" }: PhotoManagerProps) {
  const { message } = App.useApp();
  const [uploading, setUploading] = useState(false);
  const [dragId, setDragId] = useState<number | null>(null);
  const [overId, setOverId] = useState<number | null>(null);

  const handleFiles = async (files: File[]) => {
    const tooBig = files.filter((file) => file.size > MAX_MB * 1024 * 1024);
    const ok = files.filter((file) => file.size <= MAX_MB * 1024 * 1024);
    if (tooBig.length) {
      message.warning(`${tooBig.map((f) => f.name).join(", ")} ${tooBig.length === 1 ? "is" : "are"} over ${MAX_MB} MB and was skipped.`);
    }
    if (!ok.length) return;

    setUploading(true);
    try {
      const added = await upload(ok);
      onChange((current) => [...current, ...added]);
      message.success(`${added.length} photo${added.length === 1 ? "" : "s"} uploaded`);
    } catch (err) {
      message.error(errorMessage(err));
    } finally {
      setUploading(false);
    }
  };

  const saveOrder = async (next: Photo[]) => {
    const previous = photos;
    onChange(() => next);
    try {
      await adminApi.reorderPhotos(next.map((photo) => photo.id));
    } catch (err) {
      onChange(() => previous);
      message.error(errorMessage(err));
    }
  };

  const move = (from: number, to: number) => {
    if (to < 0 || to >= photos.length || from === to) return;
    const next = [...photos];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    saveOrder(next);
  };

  const remove = async (photo: Photo) => {
    try {
      await adminApi.deletePhoto(photo.id);
      onChange((current) => current.filter((item) => item.id !== photo.id));
      message.success("Photo deleted");
    } catch (err) {
      message.error(errorMessage(err));
    }
  };

  const saveAlt = async (photo: Photo, alt: string) => {
    if (alt.trim() === photo.alt) return;
    try {
      const updated = await adminApi.updatePhotoAlt(photo.id, alt);
      onChange((current) => current.map((item) => (item.id === photo.id ? { ...item, alt: updated.alt } : item)));
      message.success("Description saved");
    } catch (err) {
      message.error(errorMessage(err));
    }
  };

  const drop = (targetId: number) => {
    if (dragId === null || dragId === targetId) return;
    move(
      photos.findIndex((photo) => photo.id === dragId),
      photos.findIndex((photo) => photo.id === targetId),
    );
  };

  return (
    <div className="uh-photos">
      <Upload.Dragger
        accept={ACCEPT}
        multiple
        showUploadList={false}
        disabled={uploading}
        beforeUpload={(file, fileList) => {
          // Called once per file; handle the whole selection on the first call.
          if (file === fileList[0]) handleFiles(fileList as File[]);
          return false;
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">{uploading ? "Uploading…" : "Click or drag photos here to upload"}</p>
        <p className="ant-upload-hint">
          JPG, PNG, WebP or AVIF up to {MAX_MB} MB each. Photos are resized and optimised automatically.
        </p>
      </Upload.Dragger>

      {photos.length > 0 && (
        <p className="uh-admin__muted uh-photos__hint">
          Drag photos to reorder them. The first photo is the {coverLabel.toLowerCase()} image.
        </p>
      )}

      <div className="uh-photos__grid">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className={`uh-photo ${dragId === photo.id ? "is-dragging" : ""} ${overId === photo.id && dragId !== photo.id ? "is-over" : ""}`}
            draggable
            onDragStart={(event) => {
              setDragId(photo.id);
              event.dataTransfer.effectAllowed = "move";
            }}
            onDragOver={(event) => {
              event.preventDefault();
              setOverId(photo.id);
            }}
            onDragLeave={() => setOverId((id) => (id === photo.id ? null : id))}
            onDrop={(event) => {
              event.preventDefault();
              drop(photo.id);
              setDragId(null);
              setOverId(null);
            }}
            onDragEnd={() => {
              setDragId(null);
              setOverId(null);
            }}
          >
            <div className="uh-photo__img">
              <img src={photo.url} alt={photo.alt} draggable={false} />
              {index === 0 && (
                <span className="uh-photo__cover">
                  <StarFilled /> {coverLabel}
                </span>
              )}
              <span className="uh-photo__num">{index + 1}</span>
            </div>
            <Input
              size="small"
              placeholder="Describe the photo (for accessibility)"
              defaultValue={photo.alt}
              maxLength={200}
              onBlur={(event) => saveAlt(photo, event.target.value)}
              onPressEnter={(event) => (event.target as HTMLInputElement).blur()}
            />
            <div className="uh-photo__actions">
              <Tooltip title="Move left">
                <Button size="small" icon={<ArrowLeftOutlined />} disabled={index === 0} onClick={() => move(index, index - 1)} />
              </Tooltip>
              <Tooltip title="Move right">
                <Button size="small" icon={<ArrowRightOutlined />} disabled={index === photos.length - 1} onClick={() => move(index, index + 1)} />
              </Tooltip>
              <Tooltip title={`Make ${coverLabel.toLowerCase()} photo`}>
                <Button size="small" icon={<StarOutlined />} disabled={index === 0} onClick={() => move(index, 0)} />
              </Tooltip>
              <Popconfirm
                title="Delete this photo?"
                description="It will be removed from the website."
                okText="Delete"
                okButtonProps={{ danger: true }}
                onConfirm={() => remove(photo)}
              >
                <Button size="small" danger icon={<DeleteOutlined />} />
              </Popconfirm>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
