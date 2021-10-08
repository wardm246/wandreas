# de .c files komen in src
# de .h files komen in inc

CC=gcc
CFLAGS=-I$(IDIR)

IDIR=inc
ODIR=obj
LDIR=lib
SDIR=src

LIBS=-lm -lwiringPi

_DEPS = *.h
DEPS = $(patsubst %,$(IDIR)/%,$(_DEPS))

# de .c files maar met .o hier opsommen
_OBJ = main.o
OBJ = $(patsubst %,$(ODIR)/%,$(_OBJ))

_OBJ1 = main.o
OBJ1 = $(patsubst %,$(ODIR)/%,$(_OBJ1))

$(ODIR)/%.o: $(SDIR)/%.c $(DEPS)
	$(CC) -c -o $@ $< $(CFLAGS)

# output is de naam van de exec: sudo ./output
output: $(OBJ)
	$(CC) -o $@ $^ $(CFLAGS) $(LIBS)

output2: $(OBJ1)
	$(CC) -o $@ $^ $(CFLAGS) $(LIBS)

.PHONY: clean

clean:
	rm -f output $(ODIR)/*.o
 