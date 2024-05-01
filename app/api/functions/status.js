import {NextResponse} from 'next/server';

class Status {
  

    static createErrorResponse(message, detail, status = 500) {
        return new NextResponse(JSON.stringify({ message, error: detail }), {
          status,
          headers: { 'Content-Type': 'application/json' },
        });
      }

    static createSuccessResponse(data, status = 201) {
        return new NextResponse(JSON.stringify(data), {
          status,
          headers: { 'Content-Type': 'application/json' },
        });
      }
}

export default Status;