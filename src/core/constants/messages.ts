export const MESSAGES = {
    AUTH: {
        LOGIN_SUCCESS: "Login successful",
        INVALID_CREDENTIALS: "Invalid credentials",
        INVALID_TOKEN: "Invalid token",
        UNAUTHORIZED: "Unauthorized",
        OTP_SENT: "OTP sent to email",
        INVALID_OTP: "Invalid or expired OTP",
    },

    USER: {
        USER_NOT_FOUND: "User not found",
        USER_BLOCKED: "Your account has been blocked by admin",
        USERS_FETCHED: "Users fetched successfully",
        USER_BLOCKED_SUCCESS: "User blocked successfully",
        USER_UNBLOCKED_SUCCESS: "User unblocked successfully",
        PROFILE_UPDATED: "Profile updated successfully",
        PROFILE_UPDATE_FAILED: "Error updating profile",
    },

    ADMIN: {
        ADMIN_EXISTS: "Admin already exists",
        ADMIN_CREATED: "Admin created successfully",
        ADMIN_SEED_FAILED: "Admin seeding failed",
    },


    PRODUCT: {
        PRODUCT_NOT_FOUND: "Product not found",
        PRODUCT_FETCHED: "Product fetched successfully",
        PRODUCT_FETCH_FAILED: "Error fetching product",
    },


    SCAN: {
        BARCODE_REQUIRED: "Barcode is required",
        SCAN_SUCCESS: "Scan completed successfully",
        SCAN_FAILED: "Scan failed",
    },

    FAVORITE: {
        ADDED: "Added to favorites",
        REMOVED: "Removed from favorites",
    },

    HISTORY: {
        FETCHED: "History fetched successfully",
    },

    COMMON: {
        SERVER_ERROR: "Something went wrong",
        DB_CONNECTED: "Database connected",
        DB_CONNECTION_FAILED: "Database connection failed",
    },



} as const;