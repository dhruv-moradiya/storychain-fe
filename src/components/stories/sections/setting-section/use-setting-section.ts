import { useState } from 'react';
import { toast } from 'sonner';
import {
  useUpdateStorySettings,
  useUpdateStoryCoverImage,
  useUpdateStoryCardImage,
} from '@/hooks/story/story.mutations';
import { useGetStorySettingsBySlug, useGetStorySignatureUrl } from '@/hooks/story/story.queries';
import type { IStorySettings } from '@/type/story';
import type { IStorySettingUpdateRequest } from '@/type/story/story-request.type';
import type { SettingTab } from './setting-section.types';

export function useSettingSection(slug: string | undefined) {
  const [activeTab, setActiveTab] = useState<SettingTab>('general');

  const { data: settings, isLoading } = useGetStorySettingsBySlug(slug ?? '');
  const { mutate: updateSettings } = useUpdateStorySettings();
  const { mutate: updateCoverImage } = useUpdateStoryCoverImage();
  const { mutate: updateCardImage } = useUpdateStoryCardImage();

  const [cardUploading, setCardUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [cardPreview, setCardPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const { refetch } = useGetStorySignatureUrl(slug ?? '', {
    enabled: false,
  });

  const handleSettingUpdate = (key: keyof IStorySettings, value: boolean | string) => {
    toast.loading('Updating story settings...');

    updateSettings({ slug, [key]: value } as IStorySettingUpdateRequest, {
      onSuccess: () => {
        toast.success('Story settings updated successfully.');
      },
      onError: () => {
        toast.error('Failed to update story settings. Please try again.');
      },
      onSettled: () => {
        toast.dismiss();
      },
    });
  };

  const handleImageUpload = async (file: File, type: 'card' | 'cover') => {
    if (!slug) return;

    if (type === 'card') {
      setCardUploading(true);
      setCardPreview(URL.createObjectURL(file));
    } else {
      setCoverUploading(true);
      setCoverPreview(URL.createObjectURL(file));
    }

    try {
      const sig = await refetch();
      const uploadURL = sig.data?.data?.uploadURL;

      if (!uploadURL) {
        toast.error('Failed to get upload URL. Please try again.');
        if (type === 'card') {
          setCardUploading(false);
          setCardPreview(null);
        } else {
          setCoverUploading(false);
          setCoverPreview(null);
        }
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      const upload = await fetch(uploadURL, { method: 'POST', body: formData });
      const uploadJson = await upload.json();

      const cloudImageUrl = uploadJson.secure_url as string;
      const publicId = uploadJson.public_id as string;

      if (type === 'card') {
        updateCardImage(
          { slug, cardImage: { url: cloudImageUrl, publicId } },
          {
            onSuccess: () => {
              toast.success('Card image updated successfully.');
            },
            onError: () => {
              toast.error('Failed to update card image. Please try again.');
              setCardPreview(null);
            },
            onSettled: () => {
              setCardUploading(false);
            },
          }
        );
      } else {
        updateCoverImage(
          { slug, coverImage: { url: cloudImageUrl, publicId } },
          {
            onSuccess: () => {
              toast.success('Cover image updated successfully.');
            },
            onError: () => {
              toast.error('Failed to update cover image. Please try again.');
              setCoverPreview(null);
            },
            onSettled: () => {
              setCoverUploading(false);
            },
          }
        );
      }
    } catch {
      toast.error('Failed to upload image. Please try again.');
      if (type === 'card') {
        setCardUploading(false);
        setCardPreview(null);
      } else {
        setCoverUploading(false);
        setCoverPreview(null);
      }
    }
  };

  return {
    // State
    activeTab,
    setActiveTab,
    settings,
    isLoading,

    // Image upload state
    cardPreview,
    coverPreview,
    cardUploading,
    coverUploading,

    // Handlers
    handleSettingUpdate,
    handleImageUpload,
    setCardPreview,
    setCoverPreview,
  };
}
