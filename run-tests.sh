#!/bin/bash
# Test Suite Runner Script
# Run comprehensive tests on the Digital Leave Letter System

echo "================================================"
echo "  🧪 COMPREHENSIVE TESTING SUITE"
echo "  Digital Leave Letter System"
echo "================================================"
echo ""

# Check if server is running
echo "🔍 Checking if server is running on localhost:5000..."
if ! nc -z localhost 5000 2>/dev/null; then
    echo "❌ Server is not running!"
    echo "📌 Start the server first: node server.js"
    exit 1
fi

echo "✅ Server is running!"
echo ""
echo "⏳ Running comprehensive test suite..."
echo "📊 This will test:"
echo "   - Authentication (login for all 5 roles)"
echo "   - Leave application"
echo "   - Leave approval workflow"
echo "   - Leave rejection workflow"
echo "   - Leave forwarding workflow"
echo "   - Notifications"
echo "   - Admin features"
echo "   - Role-based access control"
echo "   - Error handling"
echo "   - Data consistency"
echo ""

# Run the test suite
node test-suite.js

TEST_EXIT_CODE=$?

echo ""
echo "================================================"
if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo "✅ ALL TESTS PASSED!"
else
    echo "❌ Some tests failed - see details above"
fi
echo "================================================"

exit $TEST_EXIT_CODE
