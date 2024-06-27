import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';

@Injectable()
export class GatewayGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('hey');
    if (context.getType() !== 'ws') {
      return false;
    }

    const client: Socket = context.switchToWs().getClient();

    console.log(client.handshake.headers, 'GatewayGuard');

    return false;
  }
}
