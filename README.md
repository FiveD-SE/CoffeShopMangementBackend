# CoffeeShopManagement Backend

This repository contains the backend code for the CoffeeShopManagement project.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/CoffeeShopManagement-Backend.git
```

2. Install dependencies:

```bash
npm install
```

## Usage

1. Start the server:

```bash
npm start
```

2. Access the API endpoints at `http://localhost:3000`.

## API Endpoints

### Orders

-   **POST `/orders/create`**

    -   Creates a new order.
    -   **Request Body:**
        ```json
        {
            "description": "string",
            "returnUrl": "string",
            "cancelUrl": "string",
            "amount": "number"
        }
        ```
    -   **Response Body:**
        ```json
        {
            "error": 0,
            "message": "Success",
            "data": {
                "bin": "string",
                "checkoutUrl": "string",
                "accountNumber": "string",
                "accountName": "string",
                "amount": "number",
                "description": "string",
                "orderCode": "number",
                "qrCode": "string"
            }
        }
        ```

-   **GET `/orders/:orderId`**

    -   Retrieves an order by ID.
    -   **Response Body:**
        ```json
        {
            "error": 0,
            "message": "ok",
            "data": {
                // Order details
            }
        }
        ```

-   **PUT `/orders/:orderId`**

    -   Cancels an order by ID.
    -   **Request Body:**
        ```json
        {
            "cancellationReason": "string"
        }
        ```
    -   **Response Body:**
        ```json
        {
            "error": 0,
            "message": "ok",
            "data": {
                // Order details
            }
        }
        ```

-   **POST `/orders/confirm-webhook`**
    -   Confirms a webhook URL.
    -   **Request Body:**
        ```json
        {
            "webhookUrl": "string"
        }
        ```
    -   **Response Body:**
        ```json
        {
            "error": 0,
            "message": "ok",
            "data": null
        }
        ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
