import requests
import sys
import json
from datetime import datetime

class DrPlumberAPITester:
    def __init__(self, base_url="https://plumber-johor-bahru.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            else:
                print(f"❌ Unsupported method: {method}")
                return False, {}

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)}")
                    return True, response_data
                except:
                    print(f"   Response: {response.text}")
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text}")
                return False, {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout")
            return False, {}
        except requests.exceptions.ConnectionError:
            print(f"❌ Failed - Connection error")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        return self.run_test(
            "API Root",
            "GET",
            "",
            200
        )

    def test_contact_form_submission(self):
        """Test contact form submission"""
        test_data = {
            "nama": "Ahmad Test",
            "telefon": "013-123-4567",
            "mesej": "Test mesej untuk perkhidmatan paip kecemasan."
        }
        
        success, response = self.run_test(
            "Contact Form Submission",
            "POST",
            "contact",
            200,
            data=test_data
        )
        
        if success and response:
            # Verify response structure
            if 'success' in response and response['success']:
                print(f"   ✅ Contact form submitted successfully")
                return response.get('id')
            else:
                print(f"   ❌ Contact form response indicates failure")
                return None
        return None

    def test_get_contact_submissions(self):
        """Test getting contact submissions"""
        return self.run_test(
            "Get Contact Submissions",
            "GET",
            "contact",
            200
        )

    def test_status_check_creation(self):
        """Test status check creation"""
        test_data = {
            "client_name": "test_client"
        }
        
        success, response = self.run_test(
            "Status Check Creation",
            "POST",
            "status",
            200,
            data=test_data
        )
        
        if success and response:
            return response.get('id')
        return None

    def test_get_status_checks(self):
        """Test getting status checks"""
        return self.run_test(
            "Get Status Checks",
            "GET",
            "status",
            200
        )

    def test_invalid_contact_submission(self):
        """Test contact form with missing fields"""
        test_data = {
            "nama": "Test User"
            # Missing telefon and mesej
        }
        
        return self.run_test(
            "Invalid Contact Submission (Missing Fields)",
            "POST",
            "contact",
            422  # Validation error expected
        )

def main():
    print("🚀 Starting Dr Plumber JB API Tests")
    print("=" * 50)
    
    # Setup
    tester = DrPlumberAPITester()
    
    # Run tests
    print("\n📡 Testing API Connectivity...")
    tester.test_api_root()
    
    print("\n📝 Testing Contact Form...")
    contact_id = tester.test_contact_form_submission()
    tester.test_get_contact_submissions()
    tester.test_invalid_contact_submission()
    
    print("\n🔍 Testing Status Endpoints...")
    status_id = tester.test_status_check_creation()
    tester.test_get_status_checks()
    
    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print(f"⚠️  {tester.tests_run - tester.tests_passed} tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())