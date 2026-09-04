import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../store/slices/authSlice";
import userService from "../services/userService";
import Badge from "../components/Badge";
import AddressModal from "../components/AddressModal";
import ProfilePhotoUploader from "../components/ProfilePhotoUploader";
import Button from "../components/Button";
import { ErrorBanner } from "../components/Feedback";

export default function Profile() {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const [profilePhoto, setProfilePhoto] = useState(currentUser?.profilePhoto || "");
  const [savingPhoto, setSavingPhoto] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!currentUser) return null;

  const handleSavePhoto = async (newPhoto) => {
    setProfilePhoto(newPhoto);
    setSavingPhoto(true);
    setMessage("");
    setError("");
    try {
      const res = await userService.updateProfile({ profilePhoto: newPhoto });
      dispatch(updateCurrentUser(res.data.user));
      setMessage("Profile photo updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile photo");
    } finally {
      setSavingPhoto(false);
    }
  };

  return (
    <div className="bg-white border border-outline-variant/80 rounded-3xl p-6 sm:p-8 shadow-sm max-w-xl mx-auto my-8 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-xl font-black text-slate-900">Your Account Profile</h1>
          <p className="text-xs text-slate-500">Manage your profile picture, address, and login credentials</p>
        </div>
        {currentUser.role === "WORKER" && (
          <Badge tone={currentUser.isVerified ? "verified" : "pending"} icon={currentUser.isVerified ? "verified" : "hourglass_empty"}>
            {currentUser.isVerified ? "Verified Worker" : "Verification Pending"}
          </Badge>
        )}
      </div>

      <ErrorBanner message={error} />
      {message && (
        <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
          {message}
        </div>
      )}

      {/* Profile Photo Uploader Section */}
      <ProfilePhotoUploader
        value={profilePhoto}
        onChange={handleSavePhoto}
        name={currentUser.name}
      />

      <dl className="flex flex-col gap-1 divide-y divide-slate-100">
        <Row label="Full Name" value={currentUser.name} />
        <Row label="Phone Number" value={currentUser.phone} />
        <Row label="Email Address" value={currentUser.email || "—"} />
        <Row label="Account Role" value={currentUser.role?.replace("_", " ")} />
        <Row label="Preferred Language" value={currentUser.language === "HI" ? "Hindi (हिंदी)" : "English"} />

        {/* Delivery / Service Address Row */}
        <div className="py-3">
          <div className="flex items-center justify-between mb-1">
            <dt className="font-label-md text-label-md text-slate-500 font-medium">Delivery / Service Address</dt>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="text-xs font-bold text-brand-purple hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">edit</span>
              Edit Address
            </button>
          </div>
          <dd className="font-body-md text-body-md text-slate-800 font-semibold">
            {currentUser.address ? (
              <span>
                {currentUser.address}
                {currentUser.city ? `, ${currentUser.city}` : ""}
                {currentUser.state ? `, ${currentUser.state}` : ""}
                {currentUser.pincode ? ` - ${currentUser.pincode}` : ""}
              </span>
            ) : (
              <span className="text-slate-400 italic">No address provided yet</span>
            )}
          </dd>
        </div>
      </dl>

      <AddressModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        currentUser={currentUser}
      />
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between py-3">
      <dt className="text-xs font-semibold text-slate-500">{label}</dt>
      <dd className="text-xs font-bold text-slate-800 capitalize">{value}</dd>
    </div>
  );
}
