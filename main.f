c This is a fourth-order Runge-Kutta program for a bead on a rotating hoop.
c It solves an equation derived in Sec. 3.5 of Strogatz, with 
c k = b/(mr) and using Numerical Recipes function RK4.
c The 4D equations of motion are:
c   \dot{theta} = v/r
c   \dot{v} = r*sin(theta)*(omega**2*cos(theta)-g/r)-k*v
c Setting 
c   y(1) = theta
c   y(2) = v
c these equations become
c   dy(1)/dt = y(2)/r
c   dy(2)/dt = r*sin(y(1))*(omega**2*cos(y(1))-g/r)-k*y(2)
c
      IMPLICIT none
      INTEGER N
      PARAMETER (N=2)
      INTEGER i, j
      REAL*8 h,t,y(N),ynew(N)
      REAL*8 g, k, r, omega, pi
      LOGICAL valid
      COMMON valid, g, k, r, omega
      EXTERNAL derivs
      y(1)=0.5d0
      y(2)=0.d0
      h = 0.01d0
      g = 9.8d0
      r = 0.1d0
      k = 5.d0
      pi = 3.1415926535d0
      omega = 20.d0
      t=0.d0
      open(unit=10,status="unknown",name="output.csv")
      write (6,*) "     t       theta       v "
      write (10,*) "t,theta,v"
      do i=0,200
        write (6,'(7f10.4)') t,y(1),y(2)
        write (10,'(6(f10.4,", "),f10.4)')t,y(1),y(2)
        valid = .true.
        call rk4(y,N,t,h,ynew,derivs)
        if (valid) then 
          do j = 1, N
            y(j) = ynew(j)
          enddo
          t = t + h
        endif
      enddo
      close(unit=10)
      END

c This is the subroutine where the time derivatives are evaluated.  If the radicand is negative,
c set valid = .false. and set the time derivatives to zero.
      SUBROUTINE derivs(t,y,dydt)
      IMPLICIT none
      REAL*8 t,y(*),dydt(*)
      REAL*8 g, k, r, omega
      LOGICAL valid
      COMMON valid, g, k, r, omega
      dydt(1) = y(2)/r
      dydt(2) = r*sin(y(1))*(omega**2*cos(y(1))-g/r)-k*y(2)
      return
      END

      SUBROUTINE rk4(y,n,x,h,ynew,derivs)
      IMPLICIT none
      INTEGER n,NMAX
      REAL*8 h,x,y(n),ynew(n)
      EXTERNAL derivs
      PARAMETER (NMAX=50)
      INTEGER i
      REAL*8 h6,hh,xh,dym(NMAX),dyt(NMAX),yt(NMAX),dydx(NMAX)
      hh=h*0.5d0
      h6=h/6.d0
      xh=x+hh
      call derivs(x,y,dydx)
      do i=1,n
        yt(i)=y(i)+hh*dydx(i)
      enddo
      call derivs(xh,yt,dyt)
      do i=1,n
        yt(i)=y(i)+hh*dyt(i)
      enddo
      call derivs(xh,yt,dym)
      do i=1,n
        yt(i)=y(i)+h*dym(i)
        dym(i)=dyt(i)+dym(i)
      enddo
      call derivs(x+h,yt,dyt)
      do i=1,n
        ynew(i)=y(i)+h6*(dydx(i)+dyt(i)+2.d0*dym(i))
      enddo
      return
      END
      
