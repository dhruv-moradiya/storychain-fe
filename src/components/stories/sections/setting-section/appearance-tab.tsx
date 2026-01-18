import { SettingCard, ImageRow } from './setting-components';

interface AppearanceTabProps {
  cardPreview: string | null;
  coverPreview: string | null;
  cardUploading: boolean;
  coverUploading: boolean;
  currentCardImage?: string;
  currentCoverImage?: string;
  onCardImageSelect: (file: File) => void;
  onCoverImageSelect: (file: File) => void;
  onCardImageRemove: () => void;
  onCoverImageRemove: () => void;
}

export function AppearanceTab({
  cardPreview,
  coverPreview,
  cardUploading,
  coverUploading,
  currentCardImage,
  currentCoverImage,
  onCardImageSelect,
  onCoverImageSelect,
  onCardImageRemove,
  onCoverImageRemove,
}: AppearanceTabProps) {
  return (
    <div className="space-y-4">
      {/* Card Image */}
      <SettingCard
        title="Card Image"
        description="Used in story cards, search results, and recommendations"
      >
        <ImageRow
          label="Portrait Image"
          hint="Recommended: 400 x 600px"
          aspectClass="aspect-[2/3] max-w-[200px]"
          preview={cardPreview}
          currentImage={currentCardImage}
          uploading={cardUploading}
          onSelect={onCardImageSelect}
          onRemove={onCardImageRemove}
        />
      </SettingCard>

      {/* Cover Image */}
      <SettingCard
        title="Cover Image"
        description="Displayed as banner on your story overview page"
      >
        <ImageRow
          label="Wide Banner"
          hint="Recommended: 1500 x 500px"
          aspectClass="aspect-[3/1]"
          preview={coverPreview}
          currentImage={currentCoverImage}
          uploading={coverUploading}
          onSelect={onCoverImageSelect}
          onRemove={onCoverImageRemove}
        />
      </SettingCard>
    </div>
  );
}
