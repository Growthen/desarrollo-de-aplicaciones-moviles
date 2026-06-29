import { createClient } from "@supabase/supabase-js";
import {
  SUPABASE_ANON_KEY,
  SUPABASE_PROFILE_BUCKET,
  SUPABASE_URL,
} from "@/shared/constants/supabase";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

function guessExtFromMime(mime?: string | null): string {
  if (!mime) return "jpg";
  if (mime.includes("png")) return "png";
  if (mime.includes("webp")) return "webp";
  if (mime.includes("gif")) return "gif";
  return "jpg";
}

function guessExtFromUri(uri: string): string {
  const m = uri.match(/\.([a-zA-Z0-9]+)(?:\?|#|$)/);
  return (m?.[1] || "jpg").toLowerCase();
}

export type UploadProfileImageInput = {
  uri: string;
  mimeType?: string | null;
  userId: number | string;
};

export type UploadProfileImageResult = {
  publicUrl: string;
  path: string;
};

export async function uploadProfileImage(
  input: UploadProfileImageInput,
): Promise<UploadProfileImageResult> {
  const { uri, mimeType, userId } = input;

  const ext = guessExtFromMime(mimeType) || guessExtFromUri(uri) || "jpg";
  const safeExt = ext.replace(/[^a-z0-9]/gi, "").slice(0, 5) || "jpg";
  const path = `${userId}/${Date.now()}.${safeExt}`;

  const response = await fetch(uri);
  const arrayBuffer = await response.arrayBuffer();

  const { error: uploadError } = await supabase.storage
    .from(SUPABASE_PROFILE_BUCKET)
    .upload(path, arrayBuffer, {
      contentType: mimeType || `image/${safeExt}`,
      upsert: true,
    });

  if (uploadError) {
    throw new Error(`No se pudo subir la imagen: ${uploadError.message}`);
  }

  const { data } = supabase.storage
    .from(SUPABASE_PROFILE_BUCKET)
    .getPublicUrl(path);

  if (!data?.publicUrl) {
    throw new Error("No se pudo obtener la URL pública de la imagen");
  }

  return { publicUrl: data.publicUrl, path };
}
