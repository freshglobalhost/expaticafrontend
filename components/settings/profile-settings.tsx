"use client";

import { useEffect, useState, useRef } from "react";
import { Loader2 } from "lucide-react";
import { FormField } from "@/components/auth/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getProfile, updateProfile, updateProfileWithPhoto } from "@/lib/api/accounts";
import { getErrorMessage } from "@/lib/api/get-error-message";
import type { ApiUser } from "@/lib/api/types";
import { COUNTRIES } from "@/lib/countries";

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
] as const;

const DEFAULT_GENDER = "prefer_not_to_say";

function applyUserToForm(
  data: ApiUser,
  setters: {
    setFirstName: (v: string) => void;
    setLastName: (v: string) => void;
    setPhone: (v: string) => void;
    setCountry: (v: string) => void;
    setAddress: (v: string) => void;
    setGender: (v: string) => void;
  }
) {
  setters.setFirstName(data.first_name ?? "");
  setters.setLastName(data.last_name ?? "");
  setters.setPhone(data.phone ?? "");
  setters.setCountry(data.country ?? "");
  setters.setAddress(data.address ?? "");
  setters.setGender(data.gender ?? DEFAULT_GENDER);
}

export function ProfileSettings() {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState(DEFAULT_GENDER);

  const formSetters = {
    setFirstName,
    setLastName,
    setPhone,
    setCountry,
    setAddress,
    setGender,
  };

  useEffect(() => {
    getProfile()
      .then((data) => {
        setUser(data);
        applyUserToForm(data, formSetters);
      })
      .catch(() => setError("Could not load profile. Is the API running?"))
      .finally(() => setLoading(false));
  }, []);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const file = fileRef.current?.files?.[0];
      let updated: ApiUser;

      if (file) {
        const form = new FormData();
        form.append("first_name", firstName.trim());
        form.append("last_name", lastName.trim());
        form.append("phone", phone.trim());
        form.append("country", country);
        form.append("address", address.trim());
        form.append("gender", gender);
        form.append("profile_picture", file);
        updated = await updateProfileWithPhoto(form);
      } else {
        updated = await updateProfile({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          phone: phone.trim(),
          country,
          address: address.trim() || null,
          gender,
        });
      }

      setUser(updated);
      applyUserToForm(updated, formSetters);
      if (fileRef.current) fileRef.current.value = "";
      setSuccess(true);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to save profile"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-brand-400" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="rounded-2xl border border-white/10 bg-surface-card p-6">
        <h3 className="font-semibold text-white">Personal information</h3>
        {user?.account_reference && (
          <p className="mt-1 text-xs text-gray-500">Account ID: {user.account_reference}</p>
        )}
        <div className="mt-6 flex items-center gap-4">
          {user?.profile_picture_url ? (
            <img
              src={user.profile_picture_url}
              alt=""
              className="h-20 w-20 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-2xl font-bold text-white">
              {user?.initials ?? "?"}
            </div>
          )}
          <div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" id="avatar" />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => fileRef.current?.click()}
            >
              Change photo
            </Button>
          </div>
        </div>
        <form onSubmit={onSave} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="First name" htmlFor="fn">
              <Input
                id="fn"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </FormField>
            <FormField label="Last name" htmlFor="ln">
              <Input
                id="ln"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </FormField>
          </div>
          <FormField label="Email" htmlFor="email">
            <Input id="email" type="email" value={user?.email ?? ""} disabled />
          </FormField>
          <FormField label="Phone" htmlFor="phone">
            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </FormField>
          <FormField label="Country" htmlFor="country">
            <Select id="country" value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="">Select country</option>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.name}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField label="Address" htmlFor="address">
            <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </FormField>
          <FormField label="Gender" htmlFor="gender">
            <Select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
              {GENDER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </FormField>
          {error && <p className="text-sm text-red-400">{error}</p>}
          {success && <p className="text-sm text-emerald-400">Profile saved.</p>}
          <Button type="submit" disabled={saving}>
            {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}
