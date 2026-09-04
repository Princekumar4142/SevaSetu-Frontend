import { Routes, Route } from "react-router-dom";
import { ROLES } from "../constants/roles";

import PublicLayout from "../layouts/PublicLayout";
import CustomerLayout from "../layouts/CustomerLayout";
import WorkerLayout from "../layouts/WorkerLayout";
import CooperativeLayout from "../layouts/CooperativeLayout";
import FederationLayout from "../layouts/FederationLayout";
import PlatformAdminLayout from "../layouts/PlatformAdminLayout";

import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/Login";
import RegisterCustomer from "../pages/RegisterCustomer";
import RegisterWorker from "../pages/RegisterWorker";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";

import WorkerDashboard from "../pages/WorkerDashboard";
import CooperativeDashboard from "../pages/CooperativeDashboard";
import FederationDashboard from "../pages/FederationDashboard";
import PlatformAdminDashboard from "../pages/PlatformAdminDashboard";
import WorkerVerification from "../pages/WorkerVerification";
import VerifiedWorkers from "../pages/VerifiedWorkers";
import WorkerDetail from "../pages/WorkerDetail";
import WorkerProfile from "../pages/WorkerProfile";

// Booking flow & Customer portal
import BookingHome from "../pages/BookingHome";
import BookingCategory from "../pages/BookingCategory";
import BookingPackage from "../pages/BookingPackage";
import BookingAddress from "../pages/BookingAddress";
import BookingSlot from "../pages/BookingSlot";
import BookingPayment from "../pages/BookingPayment";
import BookingTracking from "../pages/BookingTracking";
import BookingSummary from "../pages/BookingSummary";
import CustomerBookings from "../pages/CustomerBookings";
import SevaSetuPlus from "../pages/SevaSetuPlus";

// Worker portal modules
import WorkerBookings from "../pages/WorkerBookings";
import WorkerEarnings from "../pages/WorkerEarnings";
import WorkerTraining from "../pages/WorkerTraining";

// Cooperative, Federation & Platform Admin modules
import CooperativeWorkers from "../pages/CooperativeWorkers";
import CooperativeJobs from "../pages/CooperativeJobs";
import FederationCooperatives from "../pages/FederationCooperatives";
import FederationAnalytics from "../pages/FederationAnalytics";
import AdminUsers from "../pages/AdminUsers";
import AdminCooperatives from "../pages/AdminCooperatives";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public home & public booking flows — uses CustomerLayout */}
      <Route element={<CustomerLayout />}>
        <Route path="/" element={<BookingHome />} />
        <Route path="/customer/services/:categoryId" element={<BookingCategory />} />
        <Route path="/customer/package-builder/:categoryId" element={<BookingPackage />} />
        <Route path="/customer/checkout/address" element={<BookingAddress />} />
        <Route path="/customer/checkout/slot" element={<BookingSlot />} />
        <Route path="/customer/checkout/payment" element={<BookingPayment />} />
        <Route path="/customer/checkout/summary" element={<BookingSummary />} />
        <Route path="/customer/bookings/track/:bookingId" element={<BookingTracking />} />
        <Route path="/customer/plus" element={<SevaSetuPlus />} />
      </Route>

      {/* Public auth pages */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register/customer" element={<RegisterCustomer />} />
        <Route path="/register/worker" element={<RegisterWorker />} />
      </Route>

      {/* Customer Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.CUSTOMER]} />}>
        <Route element={<CustomerLayout />}>
          <Route path="/customer" element={<BookingHome />} />
          <Route path="/customer/services" element={<BookingHome />} />
          <Route path="/customer/services/:categoryId" element={<BookingCategory />} />
          <Route path="/customer/package-builder/:categoryId" element={<BookingPackage />} />
          <Route path="/customer/checkout/address" element={<BookingAddress />} />
          <Route path="/customer/checkout/slot" element={<BookingSlot />} />
          <Route path="/customer/checkout/payment" element={<BookingPayment />} />
          <Route path="/customer/checkout/summary" element={<BookingSummary />} />
          <Route path="/customer/bookings/track/:bookingId" element={<BookingTracking />} />
          <Route path="/customer/bookings" element={<CustomerBookings />} />
          <Route path="/customer/plus" element={<SevaSetuPlus />} />
          <Route path="/customer/profile" element={<Profile />} />
          <Route path="/customer/workers" element={<VerifiedWorkers />} />
          <Route path="/customer/workers/:workerId" element={<WorkerDetail />} />
        </Route>
      </Route>

      {/* Worker Routes */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.WORKER]} />}>
        <Route element={<WorkerLayout />}>
          <Route path="/worker" element={<WorkerDashboard />} />
          <Route path="/worker/bookings" element={<WorkerBookings />} />
          <Route path="/worker/earnings" element={<WorkerEarnings />} />
          <Route path="/worker/training" element={<WorkerTraining />} />
          <Route path="/worker/profile" element={<WorkerProfile />} />
        </Route>
      </Route>

      {/* Cooperative Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.COOPERATIVE_ADMIN]} />}>
        <Route element={<CooperativeLayout />}>
          <Route path="/cooperative" element={<CooperativeDashboard />} />
          <Route path="/cooperative/workers" element={<CooperativeWorkers />} />
          <Route path="/cooperative/verification" element={<WorkerVerification />} />
          <Route path="/cooperative/jobs" element={<CooperativeJobs />} />
          <Route path="/cooperative/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Federation Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.FEDERATION_ADMIN]} />}>
        <Route element={<FederationLayout />}>
          <Route path="/federation" element={<FederationDashboard />} />
          <Route path="/federation/cooperatives" element={<FederationCooperatives />} />
          <Route path="/federation/workforce" element={<CooperativeWorkers />} />
          <Route path="/federation/analytics" element={<FederationAnalytics />} />
          <Route path="/federation/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Platform Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.PLATFORM_ADMIN]} />}>
        <Route element={<PlatformAdminLayout />}>
          <Route path="/admin" element={<PlatformAdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/workers" element={<WorkerVerification />} />
          <Route path="/admin/cooperatives" element={<AdminCooperatives />} />
          <Route path="/admin/profile" element={<Profile />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
