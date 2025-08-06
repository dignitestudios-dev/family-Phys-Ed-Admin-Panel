export interface LoginInterface {
  email: string;
  password: string;
}

// Coach type
export interface Coach {
  coach_id: number;
  coach_uid: string;
  name: string;
  email: string;
  avatar: string | null;
  phone_number: string;
  address: string | null;
  per_slot_price: string | null;
  hourly_slot_price: string | null;
  is_deactivate: boolean;
}

// User type
export interface User {
  user_id: number;
  user_uid: string;
  name: string;
  email: string;
  avatar: string | null;
  phone_number: string;
  address: string;
  fitness_goal: string | null;
  activity_preferences: string[] | null;
  fitness_level: string | null;
  is_deactivate: boolean;
}

// Pagination link type
export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

// Generic paginated data type
export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// Root response
export interface UserInterface {
  coaches: PaginatedResponse<Coach>;
  users: PaginatedResponse<User>;
}

export interface SessionPagination<T = any> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface UserDetailsInterface {
  user_id: number;
  user_uid: string;
  name: string;
  email: string;
  phone_number: string;
  avatar: string | null;
  location: string;
  fitness_goal: string | null;
  activity_preferences: string[] | null;
  fitness_level: string | null;
  is_deactivate: boolean;
  sessions: {
    public: SessionPagination;
    private: SessionPagination;
    custom: SessionPagination;
  };
}

export interface IdentityVerificationDocs {
  driving_front: string;
  driving_back: string;
}

export interface CoachDetailsInterface {
  coach_id: number;
  coach_uid: string;
  name: string;
  email: string;
  phone_number: string;
  avatar: string;
  rating: string;
  experience: number;
  location: string;
  expertise: string;
  description: string;
  per_slot_price: string;
  hourly_slot_price: string;
  certificates: any[]; // Replace `any` with a proper type if you know the structure
  identity_verfication_docs: IdentityVerificationDocs;
  reviews: any[]; // Replace `any` with a proper type if reviews have a structure
  is_deactivate: boolean;
  portfolio: any[]; // Replace `any` with a proper type if portfolio items have a structure
  sessions: {
    public: SessionPagination;
    private: SessionPagination;
    custom: SessionPagination;
  };
  products: any[]; // Replace `any` with a proper type if known
}

export interface PostInterface {
  id: string;
  title: string;
  jobTitle?: string;
  description: string;
  datePosted: string;
  type: string;
}

interface fileType {
  URL: string;
  type: string;
}

export interface PostDetailsInterface extends PostInterface {
  user: {
    fullName: string;
    profilePicture: string;
    Bio: string;
  };
  desc: string;
  file: fileType[];
  files: fileType[];
  document: fileType[];
  media: fileType[];
  likeCount: number;
  commentCount: number;
  shareCount: number;
  createdAt: string;
}

export interface FollowerInterface {
  _id: string;
  fullName: string;
  profilePicture: string;
  email: string;
  location: string;
  phoneNumber: string;
}

export interface FollowingInterface extends FollowerInterface {}

export interface CommunityInterface {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  membersCount: number;
  postsCount: number;
  isDisabled: boolean;
}

export interface CommunityMembersInterface {
  _id: string;
  fullName: string;
  email: string;
  profilePicture: string | null;
  location: string;
  phoneNumber: string;
}

export interface ReportedUsersInterface {
  _id: string;
  reportedBy: {
    _id: string;
    fullName: string;
    email: string;
    profilePicture: string;
    username: string;
  };
  reportedUser: {
    _id: string;
    fullName: string;
    email: string;
    profilePicture: string | null;
    username: string;
    phoneNumber: string;
    location: string;
    isSuspended: boolean;
  };
  reason: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReportedPostInterface {
  _id: string;
  reportedBy: {
    _id: string;
    fullName: string;
    email: string;
    profilePicture: string | null;
    username: string;
  };
  postId: string;
  postType: string;
  reason: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  post: {
    _id: string;
    title: string;
    description: string;
    location: string;
    companyName: string;
    experience: string;
    jobType: string;
    files: {
      URL: string;
      type: string;
    }[];
    appURL: string;
    email: string;
    user: {
      _id: string;
      fullName: string;
      email: string;
      profilePicture: string | null;
      username: string;
    };
    likeCount: number;
    commentCount: number;
    shareCount: number;
    status: string;
    isLiked: boolean;
    isShared: boolean;
    isSaved: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ReportedGroupsInterface {
  _id: string;
  groupId: {
    _id: string;
    name: string;
    description: string;
    isDisabled: boolean;
  };
  user: {
    _id: string;
    fullName: string;
    email: string;
    profilePicture: string | null;
    username: string;
  };
  reason: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface GroupInterface {
  _id: string;
  name: string;
  description: string;
  creator: {
    _id: string;
    username: string;
    email: string;
    fullName: string;
    profilePicture: string | null;
  };
  members: {
    _id: string;
    username: string;
    profilePicture: string | null;
    phoneNumber: string;
    location: string;
    role: string;
    joinedAt: string;
  }[];
  isPrivate: boolean;
  coverImage: string | null;
  createdAt: string;
  updatedAt: string;
  isDisabled: boolean;
  totalMembersCount: number;
  adminCount: number;
  memberCount: number;
  totalPostsCount: number;
  isJoined: boolean;
  isRequested: boolean;
  joinedUsersCount: number;
}

export interface GroupDetailsInterface {
  _id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  coverImage: string | null;
  createdAt: string;
  updatedAt: string;
  creator: {
    _id: string;
    username: string;
    fullName: string;
    email: string;
    profilePicture: string | null;
  };
  members: {
    _id: string;
    role: string;
    joinedAt: string;
    user: {
      _id: string;
      fullName: string;
      email: string;
      phoneNumber: string;
    };
  }[];
  isDisabled: boolean;
  totalMembersCount: number;
  totalPostsCount: number;
}

export interface NotificationInterface {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  scheduledTime: string;
  isSent: boolean;
  type: string | null;
  image: string | null;
  byAdmin: boolean;
  receivers: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateNotificationInterface {
  title: string;
  description: string;
  date: string;
  time: string;
  scheduledTime?: string;
}

export interface UserGrowthAnalytics {
  total_users: {
    value: string;
    change_from_yesterday: string;
  };
  total_coaches: {
    value: string;
    change_from_yesterday: string;
  };
  total_bookings: {
    value: string;
    change_from_yesterday: string;
  };
  total_products: {
    value: string;
    change_from_yesterday: string;
  };
  sales_graph: {
    year: string;
    total_sales: number;
  }[];
}

export interface DasboardAnalytics {
  total_users: {
    value: string;
    change_from_yesterday: string;
  };
  total_coaches: {
    value: string;
    change_from_yesterday: string;
  };
  total_bookings: {
    value: string;
    change_from_yesterday: string;
  };
  total_products: {
    value: string;
    change_from_yesterday: string;
  };
  sales_graph: {
    time: string;
    product_sales: number;
    session_sales: number;
    total_sales: number;
  }[];
}

export interface SubscriptionPlan {
  status: string;
  autoRenew: boolean;
  features: string[];
  _id: string;
  title: string;
  price: number;
  description: string[];
  productId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  startDate: string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginatedSessionData<T = any> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface ISessions {
  public: PaginatedSessionData;
  private: PaginatedSessionData;
  custom: PaginatedSessionData;
}

export interface RequestItem {
  id: number;
  uid: string;
  name: string;
  avatar: string | null;
  email: string;
  phone_number: string;
  address: string;
  per_slot_price: string | null;
  hourly_slot_price: string | null;
  is_approved: string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginatedRequest<T = any> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface ApprovalRequests {
  profile_requests: PaginatedRequest<RequestItem>;
  merchandise_requests: PaginatedRequest;
}

export interface CoachInfo {
  id: number;
  uid: string;
  name: string;
  avatar: string | null;
  rating: string;
}

export interface PublicSessionDetail {
  is_started: boolean;
  session_id: number;
  title: string;
  activity: string;
  session_type: "public";
  number_of_slots: number;
  amount: string;
  distance: string;
  date: string;
  duration: string;
  description: string;
  status: string | null;
  lat: number;
  long: number;
  city: string;
  state: string;
  location: string;
  available_slots: number;
  booked_slots: number;
  booking_users: {
    id: number;
    uid: string;
    name: string;
    avatar: string;
    booked_slots: number;
  }[]; // replace `any` with appropriate user type if available
  banner_images: string[];
  use_external_address: boolean;
  deleted_at: string | null;
  started_at: string | null;
  ended_at: string | null;
  payment_method_id: string | number | null;
  cancelled_booking_users: any[]; // replace `any` with appropriate user type if available
  is_booked: boolean;
  booking_id?: number;
  coach: CoachInfo;
  session_cancellation_reason: string | null;
  payment_details: any; // update type if payment structure is known
}

export interface RequestedUser {
  id: number;
  uid: string;
  name: string;
  avatar: string;
}

export interface PaymentDetails {
  subtotal: string;
  duration: number;
  total_slots: number;
  total_amount: string;
}

export interface PrivateSessionDetail {
  time_until_start: string;
  is_started: boolean;
  session_id: number;
  title: string;
  activity: string;
  session_type: "private";
  number_of_slots: number;
  amount: string;
  distance: string;
  date: string;
  duration: string;
  description: string;
  status: string;
  lat: number;
  long: number;
  city: string;
  state: string;
  location: string;
  available_slots: number;
  booked_slots: number;
  booking_users: any[]; // define user type if needed
  banner_images: string[];
  use_external_address: boolean | null;
  deleted_at: string | null;
  started_at: string | null;
  ended_at: string | null;
  payment_method_id: string | number | null;
  cancelled_booking_users: any[]; // define user type if needed
  request_id: number;
  requested_user: RequestedUser;
  payment_details: PaymentDetails;
  request_cancellation_reason: string | null;
  booking_cancellation_reason: string | null;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  average_rating: string;
  location: string;
  description: string;
  stock: number;
  sizes: {
    small?: number;
    medium?: number;
    large?: number;
    [key: string]: number | undefined; // to allow dynamic size keys like "XL", "XXL" etc.
  };
  available_sizes: string[];
  is_approved: boolean;
  products_images: string[];
  reviews: Review[];
  coach: PCoach;
}

interface Review {
  // You can expand this based on your actual review structure
  [key: string]: any;
}

interface PCoach {
  id: number;
  uid: string;
  name: string;
  avatar: string;
  rating: number;
}

export interface MerchandiseProduct {
  id: number;
  name: string;
  category: string;
  price: string; // or `number` if you parse it
  is_approved: boolean;
  location: string;
  products_images: string[];
}

export type OrderTrackingStatus =
  | "confirmed"
  | "shipped"
  | "out for delivery"
  | "delivered"
  | "cancelled";

export interface Order {
  order_id: number;
  order_placed: string;
  delivery_address: string;
  payment_method_id: string;
  payment_method_last_digits: string;
  status: "in-progress" | "completed" | "cancelled";
  tracking_status: OrderTrackingStatus;
  cancellation_reason: string | null;
  order_items: OrderItem[];
}

export interface OrderItem {
  product_id: 1;
  product_name: "Testing Product";
  category: "T-shirt";
  price: "250.00";
  sizes: {
    [key: string]: number | undefined;
  };
  product_images: string[];
}

export interface OrderDetails extends Order {
  order_summary: {
    subtotal: string;
    total: string;
  };
  user: {
    id: number;
    uid: string;
    name: string;
    phone_number: string;
    avatar: string | null;
  };
}

export interface ReportedIssue {
  report_id: number;
  user_id: number;
  name: string;
  reason: string;
  other_reason: string | null;
  reported_by: string;
  date: string;
  time: string;
  is_deactivate: string;
  is_marked: string;
}

export interface RevenueUser {
  id: number;
  uid: string;
  name: string;
  avatar: string;
  user_type: "user" | "coach";
  attended_sessions: number;
  requests_posted: number;
  spent_amount: number;
  refunded_amount: number;
  total_revenue: number;
}

export interface RevenueMerchandise {
  id: number;
  image: string;
  product_name: string;
  coach_name: string;
  price_per_unit: string;
  total_stock: number;
  units_sold: number;
  stock_left: number;
  revenue_earned: number;
  status: "Active" | "Inactive";
}

export interface Notification {
  notification_id: number;
  title: string;
  body: string;
  date: string;
  time: string;
  status: "delivered" | "pending";
  create_at: string;
}
