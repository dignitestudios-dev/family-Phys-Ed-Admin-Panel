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
  totalActiveUsers: number;
  userGrowthData: {
    year: string;
    users: number;
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
