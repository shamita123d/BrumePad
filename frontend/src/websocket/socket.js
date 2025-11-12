// websocket/socket.js
import { useEffect, useRef } from "react";

/**
 * useSocket hook for real-time collaborative editing
 * @param {string} url - WebSocket server URL
 * @param {function} onMessage - callback when a message is received
 * @returns {function} sendMessage - function to send messages
 */
export function useSocket(url, onMessage) {
    const socketRef = useRef(null);

    useEffect(() => {
        // Connect to WebSocket server
        socketRef.current = new WebSocket(url);

        // When a message is received
        socketRef.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data); // Parse JSON data
                onMessage(data); // Pass parsed object to callback
            } catch (err) {
                console.error("Failed to parse WebSocket message:", event.data);
            }
        };

        // Cleanup on unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [url]);

    // Function to send messages (objects)
    const sendMessage = (message) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(message)); // Send as JSON
        }
    };

    return sendMessage;
}
